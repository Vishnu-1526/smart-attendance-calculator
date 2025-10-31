
import { Subject } from '../types';

export const calculateAttendancePercentage = (subject: Pick<Subject, 'present' | 'total'>): number => {
  if (subject.total === 0) return 0;
  return (subject.present / subject.total) * 100;
};

export const getAttendanceStatus = (percentage: number, minAttendance: number): 'success' | 'warning' | 'danger' => {
  if (percentage >= minAttendance) return 'success';
  if (percentage >= minAttendance - 5) return 'warning';
  return 'danger';
};

export const statusColors = {
  success: {
    bg: 'bg-success/10',
    text: 'text-success',
    progress: 'bg-success',
    ring: 'ring-success/50',
  },
  warning: {
    bg: 'bg-warning/10',
    text: 'text-warning',
    progress: 'bg-warning',
    ring: 'ring-warning/50',
  },
  danger: {
    bg: 'bg-danger/10',
    text: 'text-danger',
    progress: 'bg-danger',
    ring: 'ring-danger/50',
  },
};

export const calculateClassesToBunk = (subject: Subject, minAttendance: number): number => {
    let bunkable = 0;
    let newTotal = subject.total;
    while(true) {
        newTotal++;
        const newPercentage = (subject.present / newTotal) * 100;
        if (newPercentage < minAttendance) {
            break;
        }
        bunkable++;
    }
    return bunkable;
};

export const calculateClassesToAttend = (subject: Subject, minAttendance: number): number => {
    if(calculateAttendancePercentage(subject) >= minAttendance) return 0;
    
    let needed = 0;
    let newPresent = subject.present;
    let newTotal = subject.total;
    while(true) {
        newPresent++;
        newTotal++;
        needed++;
        const newPercentage = (newPresent / newTotal) * 100;
        if (newPercentage >= minAttendance) {
            break;
        }
        if (needed > 200) return Infinity; // Safety break
    }
    return needed;
};
