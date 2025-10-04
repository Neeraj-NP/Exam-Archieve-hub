
import React, { useState } from 'react';
import { usePapers } from '../PaperContext';
import { CheckIcon, XIcon, InboxIcon, DocumentTextIcon, CalendarIcon, BookmarkIcon, PencilIcon, TrashIcon, RefreshIcon, EyeIcon, UserIcon } from '../components/icons/Icons';
import { ExamPaper } from '../types';
import { YEARS, SEMESTERS, EXAM_TYPES, SEMESTER_SUBJECTS } from '../constants';

type AdminTab = 'pending' | 'published' | 'rejected';

const AdminPage: React.FC = () => {
  const { 
    pendingPapers, 
    publishedPapers,
    rejectedPapers,
    approvePaper, 
    rejectPaper,
    restorePaper,
    deleteRejectedPaper,
    updatePublishedPaper,
    deletePublishedPaper 
  } = usePapers();
  const [activeTab, setActiveTab] = useState<AdminTab>('pending');
  const [editingPaper, setEditingPaper] = useState<ExamPaper | null>(null);

  const renderEmptyState = (title: string, message: string) => (
    <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-lg">
      <InboxIcon className="mx-auto h-12 w-12 text-slate-400" />
      <h3 className="mt-2 text-xl font-medium text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
    </div>
  );
  
  const PaperListItem: React.FC<{ paper: ExamPaper; actions: React.ReactNode }> = ({ paper, actions }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-grow">
        <p className="font-bold text-lg text-slate-800">{paper.title}</p>
        <div className="mt-2 flex flex-wrap items-center text-slate-500 text-sm gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5"><DocumentTextIcon className="w-4 h-4" /><span>{paper.subject}</span></div>
          <div className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /><span>{paper.year}</span></div>
          <div className="flex items-center gap-1.5"><BookmarkIcon className="w-4 h-4" /><span>{paper.examType}</span></div>
          <div className="flex items-center gap-1.5"><p className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">Sem {paper.semester}</p></div>
          {paper.submittedBy && <div className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /><span>{paper.submittedBy}</span></div>}
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto">{actions}</div>
    </div>
  );

  const EditPaperModal: React.FC<{ paper: ExamPaper; onClose: () => void }> = ({ paper, onClose }) => {
      const [formData, setFormData] = useState(paper);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: name === 'year' || name === 'semester' ? parseInt(value) : value}));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePublishedPaper(formData);
        onClose();
      };
      
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-bold">Edit Paper</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 border-slate-300 rounded-md shadow-sm"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Subject</label>
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full mt-1 border-slate-300 rounded-md shadow-sm"/>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           <div>
                                <label className="block text-sm font-medium">Year</label>
                                <select name="year" value={formData.year} onChange={handleChange} className="w-full mt-1 border-slate-300 rounded-md shadow-sm">
                                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                           </div>
                           <div>
                                <label className="block text-sm font-medium">Semester</label>
                                <select name="semester" value={formData.semester} onChange={handleChange} className="w-full mt-1 border-slate-300 rounded-md shadow-sm">
                                    {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                           </div>
                           <div>
                                <label className="block text-sm font-medium">Exam Type</label>
                                <select name="examType" value={formData.examType} onChange={handleChange} className="w-full mt-1 border-slate-300 rounded-md shadow-sm">
                                    {EXAM_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
                                </select>
                           </div>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 bg-white hover:bg-slate-100">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
      );
  };
  
  const TabButton: React.FC<{ tab: AdminTab; label: string; count: number }> = ({ tab, label, count }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
      >
        {label} <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-600'}`}>{count}</span>
      </button>
    );
  };

  return (
    <div className="bg-white">
      {editingPaper && <EditPaperModal paper={editingPaper} onClose={() => setEditingPaper(null)} />}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="mt-4 text-lg text-slate-500">Review and manage all exam papers.</p>
        </div>

        <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
            <TabButton tab="pending" label="Pending" count={pendingPapers.length} />
            <TabButton tab="published" label="Published" count={publishedPapers.length} />
            <TabButton tab="rejected" label="Rejected" count={rejectedPapers.length} />
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[300px]">
          {activeTab === 'pending' && (
             pendingPapers.length > 0 ? (
                <div className="space-y-4">
                  {pendingPapers.map(paper => (
                    <PaperListItem key={paper.id} paper={paper} actions={
                        <>
                            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-100 flex items-center gap-2"><EyeIcon className="w-5 h-5" /> View</a>
                            <button onClick={() => approvePaper(paper.id)} className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center gap-2"><CheckIcon className="w-5 h-5" /> Approve</button>
                            <button onClick={() => rejectPaper(paper.id)} className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2"><XIcon className="w-5 h-5" /> Reject</button>
                        </>
                    }/>
                  ))}
                </div>
              ) : renderEmptyState('No pending submissions', 'The submission queue is empty.')
          )}
          {activeTab === 'published' && (
             publishedPapers.length > 0 ? (
                <div className="space-y-4">
                  {publishedPapers.map(paper => (
                    <PaperListItem key={paper.id} paper={paper} actions={
                        <>
                            <button onClick={() => setEditingPaper(paper)} className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2"><PencilIcon className="w-5 h-5" /> Edit</button>
                            <button onClick={() => deletePublishedPaper(paper.id)} className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2"><TrashIcon className="w-5 h-5" /> Delete</button>
                        </>
                    }/>
                  ))}
                </div>
              ) : renderEmptyState('No published papers', 'Approve a submission to see it here.')
          )}
          {activeTab === 'rejected' && (
             rejectedPapers.length > 0 ? (
                <div className="space-y-4">
                  {rejectedPapers.map(paper => (
                    <PaperListItem key={paper.id} paper={paper} actions={
                        <>
                           <button onClick={() => restorePaper(paper.id)} className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 flex items-center gap-2"><RefreshIcon className="w-5 h-5" /> Restore</button>
                           <button onClick={() => deleteRejectedPaper(paper.id)} className="flex-1 sm:flex-none w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2"><TrashIcon className="w-5 h-5" /> Delete</button>
                        </>
                    }/>
                  ))}
                </div>
              ) : renderEmptyState('No rejected papers', 'Rejected submissions will appear here.')
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
