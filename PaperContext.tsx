import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ExamPaper } from './types';
import { MOCK_PAPERS } from './constants';

export interface NewPaperSubmission {
    subject: string;
    year: number;
    semester: number;
    examType: string;
    file: File;
    submittedBy: string;
}

// LocalStorage keys
const PUBLISHED_KEY = 'exam-hub-publishedPapers';
const PENDING_KEY = 'exam-hub-pendingPapers';
const REJECTED_KEY = 'exam-hub-rejectedPapers';

// Helper to safely get and parse data from localStorage
const getStoredPapers = (key: string, defaultValue: ExamPaper[]): ExamPaper[] => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      // For mock data initialization
      if (key === PUBLISHED_KEY && defaultValue.length > 0) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
      return defaultValue;
    }
    // Dates are stored as strings, so we need to convert them back
    return JSON.parse(storedValue).map((paper: any) => ({
        ...paper,
        submittedAt: new Date(paper.submittedAt),
    }));
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

interface PaperContextType {
  publishedPapers: ExamPaper[];
  pendingPapers: ExamPaper[];
  rejectedPapers: ExamPaper[];
  submitPaper: (paper: NewPaperSubmission) => void;
  approvePaper: (paperId: number) => void;
  rejectPaper: (paperId: number) => void;
  restorePaper: (paperId: number) => void;
  deleteRejectedPaper: (paperId: number) => void;
  updatePublishedPaper: (paper: ExamPaper) => void;
  deletePublishedPaper: (paperId: number) => void;
}

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export const PaperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [publishedPapers, setPublishedPapers] = useState<ExamPaper[]>(() => getStoredPapers(PUBLISHED_KEY, MOCK_PAPERS));
  const [pendingPapers, setPendingPapers] = useState<ExamPaper[]>(() => getStoredPapers(PENDING_KEY, []));
  const [rejectedPapers, setRejectedPapers] = useState<ExamPaper[]>(() => getStoredPapers(REJECTED_KEY, []));
  
  // Effects to sync state with localStorage whenever papers change
  useEffect(() => { localStorage.setItem(PUBLISHED_KEY, JSON.stringify(publishedPapers)); }, [publishedPapers]);
  useEffect(() => { localStorage.setItem(PENDING_KEY, JSON.stringify(pendingPapers)); }, [pendingPapers]);
  useEffect(() => { localStorage.setItem(REJECTED_KEY, JSON.stringify(rejectedPapers)); }, [rejectedPapers]);


  const submitPaper = (paperData: NewPaperSubmission) => {
    const reader = new FileReader();
    reader.readAsDataURL(paperData.file);
    reader.onload = () => {
        const newPaper: ExamPaper = {
          subject: paperData.subject,
          year: paperData.year,
          semester: paperData.semester,
          examType: paperData.examType,
          submittedBy: paperData.submittedBy,
          id: Date.now(),
          title: `${paperData.subject} - ${paperData.examType} ${paperData.year}`,
          views: 0,
          submittedAt: new Date(),
          url: '#', // Not needed, file content is stored
          fileContent: reader.result as string,
          fileType: paperData.file.type,
        };
        setPendingPapers(prev => [newPaper, ...prev]);
    };
    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
  };

  const approvePaper = (paperId: number) => {
    const paperToApprove = pendingPapers.find(p => p.id === paperId);
    if (paperToApprove) {
      setPublishedPapers(prev => [paperToApprove, ...prev]);
      setPendingPapers(prev => prev.filter(p => p.id !== paperId));
    }
  };
  
  const rejectPaper = (paperId: number) => {
    const paperToReject = pendingPapers.find(p => p.id === paperId);
    if (paperToReject) {
        setRejectedPapers(prev => [paperToReject, ...prev]);
        setPendingPapers(prev => prev.filter(p => p.id !== paperId));
    }
  };

  const restorePaper = (paperId: number) => {
    const paperToRestore = rejectedPapers.find(p => p.id === paperId);
    if (paperToRestore) {
      setPendingPapers(prev => [paperToRestore, ...prev]);
      setRejectedPapers(prev => prev.filter(p => p.id !== paperId));
    }
  };

  const deleteRejectedPaper = (paperId: number) => {
    setRejectedPapers(prev => prev.filter(p => p.id !== paperId));
  };

  const updatePublishedPaper = (updatedPaper: ExamPaper) => {
      setPublishedPapers(prev => prev.map(p => p.id === updatedPaper.id ? updatedPaper : p));
  };
  
  const deletePublishedPaper = (paperId: number) => {
      setPublishedPapers(prev => prev.filter(p => p.id !== paperId));
  };

  const value = {
    publishedPapers,
    pendingPapers,
    rejectedPapers,
    submitPaper,
    approvePaper,
    rejectPaper,
    restorePaper,
    deleteRejectedPaper,
    updatePublishedPaper,
    deletePublishedPaper
  };

  return (
    <PaperContext.Provider value={value}>
      {children}
    </PaperContext.Provider>
  );
};

export const usePapers = () => {
  const context = useContext(PaperContext);
  if (context === undefined) {
    throw new Error('usePapers must be used within a PaperProvider');
  }
  return context;
};