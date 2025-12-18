import { useState, useEffect, useCallback } from 'react';
import { ResumeData, RESUME_STORAGE_KEY, createEmptyResumeData } from '@/types/resume';

interface UseResumeStorageReturn {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  hasStoredData: boolean;
  loadStoredData: () => void;
  startFresh: () => void;
  resetAll: () => void;
  isInitialized: boolean;
}

export const useResumeStorage = (): UseResumeStorageReturn => {
  const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResumeData());
  const [hasStoredData, setHasStoredData] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for stored data on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESUME_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.header) {
          setHasStoredData(true);
        }
      }
    } catch (error) {
      console.error('Error checking localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever resumeData changes (debounced effect)
  useEffect(() => {
    if (!isInitialized) return;
    
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resumeData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [resumeData, isInitialized]);

  const loadStoredData = useCallback(() => {
    try {
      const stored = localStorage.getItem(RESUME_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ResumeData;
        setResumeData(parsed);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      setResumeData(createEmptyResumeData());
    }
    setHasStoredData(false);
  }, []);

  const startFresh = useCallback(() => {
    setResumeData(createEmptyResumeData());
    setHasStoredData(false);
  }, []);

  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem(RESUME_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
    setResumeData(createEmptyResumeData());
    setHasStoredData(false);
  }, []);

  return {
    resumeData,
    setResumeData,
    hasStoredData,
    loadStoredData,
    startFresh,
    resetAll,
    isInitialized,
  };
};
