
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ExamPaper, User } from './types';
import { MOCK_PAPERS } from './constants';

export interface NewPaperSubmission {
    subject: string;
    year: number;
    semester: number;
    examType: string;
    file: File;
    submittedBy: string;
}

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
  const [publishedPapers, setPublishedPapers] = useState<ExamPaper[]>(MOCK_PAPERS);
  const [pendingPapers, setPendingPapers] = useState<ExamPaper[]>([]);
  const [rejectedPapers, setRejectedPapers] = useState<ExamPaper[]>([]);

  const submitPaper = (paperData: NewPaperSubmission) => {
    const fileUrl = URL.createObjectURL(paperData.file);
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
      url: fileUrl,
    };
    setPendingPapers(prev => [newPaper, ...prev]);
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
    const paperToDelete = rejectedPapers.find(p => p.id === paperId);
    if (paperToDelete) {
      URL.revokeObjectURL(paperToDelete.url);
      setRejectedPapers(prev => prev.filter(p => p.id !== paperId));
    }
  };

  const updatePublishedPaper = (updatedPaper: ExamPaper) => {
      setPublishedPapers(prev => prev.map(p => p.id === updatedPaper.id ? updatedPaper : p));
  };
  
  const deletePublishedPaper = (paperId: number) => {
      const paperToDelete = publishedPapers.find(p => p.id === paperId);
      if (paperToDelete && paperToDelete.url.startsWith('blob:')) {
        URL.revokeObjectURL(paperToDelete.url);
      }
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
