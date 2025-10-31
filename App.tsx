
import React, { useState, useMemo } from 'react';
import { Subject, Profile } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SubjectManager from './components/SubjectManager';
import Analytics from './components/Analytics';
import ProfileSettings from './components/ProfileSettings';
import { calculateAttendancePercentage } from './utils/attendance';

enum View {
  Dashboard,
  Subjects,
  Analytics,
  Profile
}

const App: React.FC = () => {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', []);
  const [profile, setProfile] = useLocalStorage<Profile>('profile', { minAttendance: 75 });
  const [view, setView] = useState<View>(View.Dashboard);

  const overallAttendance = useMemo(() => {
    if (subjects.length === 0) return 0;
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
    const totalPresent = subjects.reduce((sum, s) => sum + s.present, 0);
    return totalClasses > 0 ? (totalPresent / totalClasses) * 100 : 0;
  }, [subjects]);

  const sortedSubjects = useMemo(() => {
    return [...subjects].sort((a, b) => {
      const percentageA = calculateAttendancePercentage(a);
      const percentageB = calculateAttendancePercentage(b);
      return percentageA - percentageB;
    });
  }, [subjects]);
  
  const addSubject = (subject: Omit<Subject, 'id'>) => {
    setSubjects([...subjects, { ...subject, id: Date.now() }]);
  };

  const updateSubject = (updatedSubject: Subject) => {
    setSubjects(subjects.map(s => s.id === updatedSubject.id ? updatedSubject : s));
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };
  
  const addBulkSubjects = (newSubjects: Omit<Subject, 'id'>[]) => {
    const subjectsWithIds = newSubjects.map(s => ({...s, id: Date.now() + Math.random()}));
    setSubjects(prev => [...prev, ...subjectsWithIds]);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all subjects and profile data? This action cannot be undone.')) {
      setSubjects([]);
      setProfile({ minAttendance: 75 });
      setView(View.Dashboard);
    }
  };

  const markPresent = (id: number) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, present: s.present + 1, total: s.total + 1 } : s
    ));
  };

  const markAbsent = (id: number) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, total: s.total + 1 } : s
    ));
  };

  const renderView = () => {
    switch (view) {
      case View.Subjects:
        return <SubjectManager 
                  subjects={subjects} 
                  addSubject={addSubject} 
                  updateSubject={updateSubject} 
                  deleteSubject={deleteSubject} 
                  minAttendance={profile.minAttendance} 
                  addBulkSubjects={addBulkSubjects}
                  markPresent={markPresent}
                  markAbsent={markAbsent}
                />;
      case View.Analytics:
        return <Analytics subjects={subjects} minAttendance={profile.minAttendance} />;
      case View.Profile:
        return <ProfileSettings profile={profile} setProfile={setProfile} clearAllData={clearAllData} />;
      case View.Dashboard:
      default:
        return <Dashboard subjects={sortedSubjects} overallAttendance={overallAttendance} minAttendance={profile.minAttendance} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface rounded-lg shadow-xl p-4 sm:p-6 mb-8">
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <NavButton label="Dashboard" active={view === View.Dashboard} onClick={() => setView(View.Dashboard)} />
            <NavButton label="Subjects" active={view === View.Subjects} onClick={() => setView(View.Subjects)} />
            <NavButton label="Analytics" active={view === View.Analytics} onClick={() => setView(View.Analytics)} />
            <NavButton label="Settings" active={view === View.Profile} onClick={() => setView(View.Profile)} />
          </nav>
        </div>
        <div className="animate-fade-in">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

interface NavButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-brand-primary ${
            active 
                ? 'bg-brand-primary text-white shadow-lg' 
                : 'text-text-secondary hover:bg-gray-700 hover:text-white'
        }`}
    >
        {label}
    </button>
);


export default App;
