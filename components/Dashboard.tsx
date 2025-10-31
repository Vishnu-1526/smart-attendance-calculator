
import React from 'react';
import { Subject } from '../types';
import SubjectCard from './SubjectCard';
import { calculateAttendancePercentage, getAttendanceStatus } from '../utils/attendance';

interface DashboardProps {
  subjects: Subject[];
  overallAttendance: number;
  minAttendance: number;
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, overallAttendance, minAttendance }) => {

  const safeSubjects = subjects.filter(s => calculateAttendancePercentage(s) >= minAttendance).length;
  const atRiskSubjects = subjects.length - safeSubjects;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Overall Attendance" value={`${overallAttendance.toFixed(1)}%`} />
        <StatCard label="Total Subjects" value={subjects.length.toString()} />
        <StatCard label="Safe Subjects" value={safeSubjects.toString()} />
        <StatCard label="At-Risk Subjects" value={atRiskSubjects.toString()} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Subjects Overview</h2>
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(subject => (
              <SubjectCard key={subject.id} subject={subject} minAttendance={minAttendance} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface rounded-lg">
            <h3 className="text-xl font-medium text-text-primary">No subjects found.</h3>
            <p className="text-text-secondary mt-2">Add or import subjects to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
    label: string;
    value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
    <div className="bg-surface p-6 rounded-lg shadow-lg border border-gray-700">
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
    </div>
);


export default Dashboard;
