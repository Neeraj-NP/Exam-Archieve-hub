import React from 'react';
import { ExamPaper } from '../types';
import { DocumentTextIcon, CalendarIcon, EyeIcon, DownloadIcon, EyeIcon as ViewIcon, BookmarkIcon } from './icons/Icons';

interface PaperCardProps {
  paper: ExamPaper;
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wide">
            <DocumentTextIcon className="w-5 h-5" />
            {paper.subject}
        </div>
        <h3 className="block mt-2 text-xl leading-tight font-bold text-slate-900 hover:underline">{paper.title}</h3>
        <div className="mt-4 flex items-center text-slate-500 text-sm space-x-4">
            <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                <span>{paper.year}</span>
            </div>
             <div className="flex items-center gap-1.5">
                <BookmarkIcon className="w-4 h-4" />
                <span>{paper.examType}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <EyeIcon className="w-4 h-4" />
                <span>{paper.views.toLocaleString()} views</span>
            </div>
        </div>
      </div>
      <div className="p-6 bg-slate-50/70 flex items-center justify-between gap-3">
        <a 
          href={paper.url}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
        >
            <DownloadIcon className="w-5 h-5" />
            Download
        </a>
        <a 
          href={paper.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
        >
            <ViewIcon className="w-5 h-5" />
            View
        </a>
      </div>
    </div>
  );
};