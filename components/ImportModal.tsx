
import React, { useState } from 'react';
import { Subject } from '../types';
import { extractSubjectsFromImage } from '../services/geminiService';

interface ImportModalProps {
  onClose: () => void;
  onImport: (subjects: Omit<Subject, 'id'>[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleImport = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64String = (reader.result as string).split(',')[1];
          const subjects = await extractSubjectsFromImage(base64String, file.type);
          onImport(subjects);
          onClose();
        } catch (err: any) {
          setError(err.message || "An unknown error occurred during image processing.");
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read the file.");
        setIsLoading(false);
      };
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl p-6 w-full max-w-lg m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import from Image</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
        </div>
        <div className="space-y-4">
          <p className="text-text-secondary">Upload an image of your attendance sheet. The AI will try to extract the subject data automatically.</p>
          
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10">
            <div className="text-center">
              {preview ? (
                <img src={preview} alt="Image preview" className="mx-auto h-40 object-contain"/>
              ) : (
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-gray-800 font-semibold text-brand-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-brand-light px-2">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {file && <p className="text-sm text-center text-text-secondary">Selected: {file.name}</p>}

          {error && <p className="text-danger text-sm text-center">{error}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={handleImport} disabled={!file || isLoading} className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Importing...' : 'Import'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
