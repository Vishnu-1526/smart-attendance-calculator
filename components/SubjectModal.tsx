
import React, { useState } from 'react';
import { Subject } from '../types';

interface SubjectModalProps {
  subject: Subject | null;
  onClose: () => void;
  onSave: (subjectData: Omit<Subject, 'id'>) => void;
  onDelete: (id: number) => void;
}

const SubjectModal: React.FC<SubjectModalProps> = ({ subject, onClose, onSave, onDelete }) => {
  const [name, setName] = useState(subject?.name || '');
  const [code, setCode] = useState(subject?.code || '');
  const [present, setPresent] = useState(subject?.present?.toString() || '0');
  const [total, setTotal] = useState(subject?.total?.toString() || '0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const presentNum = parseInt(present, 10);
    const totalNum = parseInt(total, 10);

    if (isNaN(presentNum) || isNaN(totalNum) || presentNum < 0 || totalNum < 0) {
      alert("Please enter valid numbers for classes.");
      return;
    }
    if (presentNum > totalNum) {
      alert("Attended classes cannot be more than total classes.");
      return;
    }

    onSave({ name, code, present: presentNum, total: totalNum });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{subject ? 'Edit Subject' : 'Add Subject'}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Subject Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Subject Code</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">Classes Attended</label>
              <input type="number" value={present} onChange={e => setPresent(e.target.value)} required min="0" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">Total Classes</label>
              <input type="number" value={total} onChange={e => setTotal(e.target.value)} required min="0" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            {subject && (
              <button type="button" onClick={() => onDelete(subject.id)} className="bg-danger hover:bg-danger/80 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Delete
              </button>
            )}
            <button type="submit" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
