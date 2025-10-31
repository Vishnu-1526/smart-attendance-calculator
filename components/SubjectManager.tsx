import React, { useState } from 'react';
import { Subject } from '../types';
import SubjectCard from './SubjectCard';
import SubjectModal from './SubjectModal';
import ImportModal from './ImportModal';

interface SubjectManagerProps {
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (subject: Subject) => void;
  deleteSubject: (id: number) => void;
  addBulkSubjects: (newSubjects: Omit<Subject, 'id'>[]) => void;
  minAttendance: number;
  markPresent: (id: number) => void;
  markAbsent: (id: number) => void;
}

const SubjectManager: React.FC<SubjectManagerProps> = ({ subjects, addSubject, updateSubject, deleteSubject, addBulkSubjects, minAttendance, markPresent, markAbsent }) => {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsSubjectModalOpen(true);
  };
  
  const handleAddNew = () => {
    setSelectedSubject(null);
    setIsSubjectModalOpen(true);
  }

  const handleCloseSubjectModal = () => {
    setIsSubjectModalOpen(false);
    setSelectedSubject(null);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={handleAddNew} className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Add Subject Manually
        </button>
        <button onClick={() => setIsImportModalOpen(true)} className="bg-brand-secondary hover:bg-brand-secondary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Import from Image
        </button>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map(subject => (
            <SubjectCard 
              key={subject.id}
              subject={subject} 
              minAttendance={minAttendance} 
              onClick={() => handleEdit(subject)}
              viewMode="subjects"
              onMarkPresent={markPresent}
              onMarkAbsent={markAbsent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface rounded-lg">
            <h3 className="text-xl font-medium text-text-primary">No subjects found.</h3>
            <p className="text-text-secondary mt-2">Add one manually or import from an image.</p>
        </div>
      )}

      {isSubjectModalOpen && (
        <SubjectModal
          subject={selectedSubject}
          onClose={handleCloseSubjectModal}
          onSave={(subjectData) => {
            if(selectedSubject) {
                updateSubject({ ...selectedSubject, ...subjectData });
            } else {
                addSubject(subjectData);
            }
            handleCloseSubjectModal();
          }}
          onDelete={(id) => {
            deleteSubject(id);
            handleCloseSubjectModal();
          }}
        />
      )}
      
      {isImportModalOpen && (
        <ImportModal
            onClose={() => setIsImportModalOpen(false)}
            onImport={addBulkSubjects}
        />
      )}
    </div>
  );
};

export default SubjectManager;
