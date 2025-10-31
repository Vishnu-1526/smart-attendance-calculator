
import React, { useState } from 'react';
import { Profile } from '../types';

interface ProfileSettingsProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  clearAllData: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, setProfile, clearAllData }) => {
  const [minAttendance, setMinAttendance] = useState(profile.minAttendance);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setProfile({ ...profile, minAttendance });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  
  return (
    <div className="bg-surface p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="minAttendance" className="block text-sm font-medium text-text-secondary mb-1">
            Minimum Required Attendance (%)
          </label>
          <input
            type="number"
            id="minAttendance"
            value={minAttendance}
            onChange={(e) => setMinAttendance(parseInt(e.target.value, 10) || 0)}
            min="0"
            max="100"
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
          />
          <p className="text-xs text-text-secondary mt-1">Set the attendance percentage required to be in the "safe" zone.</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Save Settings
          </button>
          {isSaved && <p className="text-success text-sm">Settings saved!</p>}
        </div>

        <div className="pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-danger">Danger Zone</h3>
            <p className="text-text-secondary text-sm mt-1 mb-3">This will permanently delete all your subjects and reset your profile settings.</p>
            <button
                onClick={clearAllData}
                className="bg-danger hover:bg-danger/80 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                Clear All Data
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
