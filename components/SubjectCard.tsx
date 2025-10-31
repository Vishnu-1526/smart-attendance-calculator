import React from 'react';
import { Subject } from '../types';
import { calculateAttendancePercentage, getAttendanceStatus, statusColors, calculateClassesToBunk, calculateClassesToAttend } from '../utils/attendance';
import { Check, X } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  minAttendance: number;
  onClick?: () => void;
  viewMode?: 'dashboard' | 'subjects';
  onMarkPresent?: (id: number) => void;
  onMarkAbsent?: (id: number) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
    subject, 
    minAttendance, 
    onClick, 
    viewMode = 'dashboard',
    onMarkPresent,
    onMarkAbsent
}) => {
  const percentage = calculateAttendancePercentage(subject);
  const status = getAttendanceStatus(percentage, minAttendance);
  const colors = statusColors[status];

  const classesToBunk = calculateClassesToBunk(subject, minAttendance);
  const classesToAttendVal = calculateClassesToAttend(subject, minAttendance);

  const handlePresentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card's onClick from firing
    onMarkPresent?.(subject.id);
  };

  const handleAbsentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card's onClick from firing
    onMarkAbsent?.(subject.id);
  };

  return (
    <div 
        className={`bg-surface p-5 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 flex flex-col justify-between ${onClick ? 'cursor-pointer hover:shadow-brand-primary/20 hover:border-brand-primary/50' : ''}`}
        onClick={onClick}
    >
      <div>
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-sm text-text-secondary truncate">{subject.code}</p>
            <h3 className="text-lg font-bold text-text-primary break-words line-clamp-2">{subject.name}</h3>
          </div>
          <div className={`text-xl font-bold whitespace-nowrap flex-shrink-0 ${colors.text}`}>
            {percentage.toFixed(1)}%
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div className={`${colors.progress} h-2.5 rounded-full`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
          </div>
          <p className="text-right text-sm text-text-secondary mt-1">{subject.present} / {subject.total} classes</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 text-sm">
        {viewMode === 'dashboard' ? (
            <div className="min-h-[2.5rem] flex items-center">
                {status === 'success' ? (
                    <p className="text-green-400">You can bunk <span className="font-bold">{classesToBunk}</span> more class(es).</p>
                ) : (
                    <p className="text-red-400">Attend next <span className="font-bold">{classesToAttendVal === Infinity ? '>200' : classesToAttendVal}</span> class(es) to be safe.</p>
                )}
            </div>
        ) : (
            <div className="flex justify-around items-center min-h-[2.5rem]">
                 <button
                    onClick={handlePresentClick}
                    className="flex items-center gap-2 text-success bg-success/10 hover:bg-success/20 font-bold py-2 px-4 rounded-lg transition-colors"
                    aria-label={`Mark present for ${subject.name}`}
                >
                    <Check className="h-5 w-5" />
                    <span>Present</span>
                </button>
                <button
                    onClick={handleAbsentClick}
                    className="flex items-center gap-2 text-warning bg-warning/10 hover:bg-warning/20 font-bold py-2 px-4 rounded-lg transition-colors"
                    aria-label={`Mark absent for ${subject.name}`}
                >
                    <X className="h-5 w-5" />
                    <span>Absent</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
