
import React from 'react';
import { usePapers } from '../PaperContext';
import { CheckIcon, XIcon, InboxIcon, DocumentTextIcon, CalendarIcon, BookmarkIcon } from '../components/icons/Icons';

const AdminPage: React.FC = () => {
  const { pendingPapers, approvePaper, rejectPaper } = usePapers();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="mt-4 text-lg text-slate-500">
            Review and approve new paper submissions.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Pending Submissions ({pendingPapers.length})</h2>
          
          {pendingPapers.length > 0 ? (
            <div className="space-y-4">
              {pendingPapers.map(paper => (
                <div key={paper.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <p className="font-bold text-lg text-slate-800">{paper.title}</p>
                    <div className="mt-2 flex flex-wrap items-center text-slate-500 text-sm gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1.5">
                            <DocumentTextIcon className="w-4 h-4" />
                            <span>{paper.subject}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{paper.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BookmarkIcon className="w-4 h-4" />
                            <span>{paper.examType}</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <p className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">Sem {paper.semester}</p>
                        </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => approvePaper(paper.id)}
                      className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-colors"
                    >
                      <CheckIcon className="w-5 h-5" />
                      Approve
                    </button>
                    <button 
                      onClick={() => rejectPaper(paper.id)}
                      className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2 transition-colors"
                    >
                       <XIcon className="w-5 h-5" />
                       Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-lg">
                <InboxIcon className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-xl font-medium text-slate-800">No pending submissions</h3>
                <p className="mt-1 text-sm text-slate-500">The submission queue is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
