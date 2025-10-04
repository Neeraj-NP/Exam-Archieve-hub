
import React, { useState, useEffect } from 'react';
import { SEMESTER_SUBJECTS, YEARS, EXAM_TYPES, SEMESTERS } from '../constants';
import { UploadIcon, CheckCircleIcon, PaperAirplaneIcon } from '../components/icons/Icons';
import { usePapers } from '../PaperContext';
import { useAuth } from '../AuthContext';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const SubmitPaperPage: React.FC = () => {
  const { submitPaper } = usePapers();
  const { currentUser } = useAuth();
  
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState<string>(YEARS[0].toString());
  const [semester, setSemester] = useState<string>('1');
  const [examType, setExamType] = useState<string>(EXAM_TYPES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState('');
  
  const [availableSubjects, setAvailableSubjects] = useState<string[]>(SEMESTER_SUBJECTS[1] || []);

  useEffect(() => {
    const selectedSemester = parseInt(semester, 10);
    const newSubjects = SEMESTER_SUBJECTS[selectedSemester] || [];
    setAvailableSubjects(newSubjects);
    if (!newSubjects.includes(subject)) {
        setSubject('');
    }
  }, [semester, subject]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload a PDF, JPG, or PNG file.');
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size exceeds 5MB. Please upload a smaller file.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !year || !file || !examType || !semester || !currentUser) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setStatus('submitting');

    submitPaper({
      subject,
      year: parseInt(year, 10),
      examType,
      semester: parseInt(semester, 10),
      file,
      submittedBy: currentUser.email,
    });

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };
  
  const resetForm = () => {
    setSubject('');
    setYear(YEARS[0].toString());
    setSemester('1');
    setExamType(EXAM_TYPES[0]);
    setFile(null);
    setNotes('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Thank You!</h2>
        <p className="mt-2 text-lg text-slate-600">Your submission has been received. It will be reviewed by an admin before being published. We appreciate your contribution!</p>
        <button
          onClick={resetForm}
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Another Paper
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Submit an Exam Paper</h1>
          <p className="mt-4 text-lg text-slate-500">
            Help fellow students by contributing to our archive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-xl border border-slate-200">
           <div>
            <label htmlFor="submitter" className="block text-sm font-medium text-slate-700">Submitting as</label>
            <input type="text" id="submitter" value={currentUser?.email || ''} readOnly className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-slate-100 text-slate-500 cursor-not-allowed" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div>
                <label htmlFor="semester" className="block text-sm font-medium text-slate-700">Semester*</label>
                <select id="semester" value={semester} onChange={e => setSemester(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject*</label>
              <input list="subjects" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              <datalist id="subjects">
                  {availableSubjects.map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-slate-700">Year*</label>
              <select id="year" value={year} onChange={e => setYear(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="examType" className="block text-sm font-medium text-slate-700">Exam Type*</label>
              <select id="examType" value={examType} onChange={e => setExamType(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  {EXAM_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Upload Paper (PDF/JPG/PNG, max 5MB)*</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>{file ? 'Change file' : 'Upload a file'}</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                  </label>
                  <p className="pl-1">{!file && 'or drag and drop'}</p>
                </div>
                <p className="text-xs text-slate-500">{file ? file.name : 'PDF, JPG, PNG up to 5MB'}</p>
              </div>
            </div>
          </div>
          
           <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes (Optional)</label>
            <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Any additional notes for the reviewer..." className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Paper'}
              {status !== 'submitting' && <PaperAirplaneIcon className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPaperPage;
