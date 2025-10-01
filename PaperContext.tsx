
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ExamPaper } from './types';
import { MOCK_PAPERS } from './constants';

export interface NewPaperSubmission {
    subject: string;
    year: number;
    semester: number;
    examType: string;
    file: File;
}

interface PaperContextType {
  publishedPapers: ExamPaper[];
  pendingPapers: ExamPaper[];
  submitPaper: (paper: NewPaperSubmission) => void;
  approvePaper: (paperId: number) => void;
  rejectPaper: (paperId: number) => void;
}

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export const PaperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [publishedPapers, setPublishedPapers] = useState<ExamPaper[]>(MOCK_PAPERS);
  const [pendingPapers, setPendingPapers] = useState<ExamPaper[]>([]);

  const submitPaper = (paperData: NewPaperSubmission) => {
    const fileUrl = URL.createObjectURL(paperData.file);
    const newPaper: ExamPaper = {
      subject: paperData.subject,
      year: paperData.year,
      semester: paperData.semester,
      examType: paperData.examType,
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
        // Revoke the object URL to prevent memory leaks
        URL.revokeObjectURL(paperToReject.url);
        setPendingPapers(prev => prev.filter(p => p.id !== paperId));
    }
  };

  return (
    <PaperContext.Provider value={{ publishedPapers, pendingPapers, submitPaper, approvePaper, rejectPaper }}>
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