import React, { useState, useMemo, useEffect } from 'react';
import { ALL_SUBJECTS, SEMESTER_SUBJECTS, YEARS, SEMESTERS, EXAM_TYPES } from '../constants';
import { PaperCard } from '../components/PaperCard';
import { SearchIcon, FilterIcon, SortAscendingIcon, XIcon } from '../components/icons/Icons';
import { usePapers } from '../PaperContext';

const FindPapersPage: React.FC = () => {
  const { publishedPapers } = usePapers();
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState('all');
  const [year, setYear] = useState('all');
  const [semester, setSemester] = useState('all');
  const [examType, setExamType] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const availableSubjects = useMemo(() => {
    if (semester === 'all') {
      return ALL_SUBJECTS;
    }
    const selectedSemester = parseInt(semester, 10);
    return SEMESTER_SUBJECTS[selectedSemester] || [];
  }, [semester]);

  useEffect(() => {
    if (subject !== 'all' && !availableSubjects.includes(subject)) {
        setSubject('all');
    }
  }, [availableSubjects, subject]);


  const filteredAndSortedPapers = useMemo(() => {
    let papers = publishedPapers.filter(paper => {
      const searchTermMatch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const subjectMatch = subject === 'all' || paper.subject === subject;
      const yearMatch = year === 'all' || paper.year.toString() === year;
      const semesterMatch = semester === 'all' || paper.semester.toString() === semester;
      const examTypeMatch = examType === 'all' || paper.examType === examType;
      return searchTermMatch && subjectMatch && yearMatch && semesterMatch && examTypeMatch;
    });

    if (sortBy === 'popularity') {
      papers.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'newest') {
      papers.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
    }

    return papers;
  }, [searchTerm, subject, year, semester, examType, sortBy, publishedPapers]);

  const resetFilters = () => {
    setSearchTerm('');
    setSubject('all');
    setYear('all');
    setSemester('all');
    setExamType('all');
    setSortBy('popularity');
  };

  const activeFiltersCount = [searchTerm, subject, year, semester, examType].filter(f => f !== '' && f !== 'all').length;


  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Find Exam Papers</h1>
          <p className="mt-4 text-lg text-slate-500">
            Use the search and filters below to find exactly what you're looking for.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative lg:col-span-2">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by subject, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
             <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="all">All Semesters</option>
              {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="all">All Subjects</option>
              {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="all">All Years</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select value={examType} onChange={(e) => setExamType(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="all">All Exam Types</option>
              {EXAM_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-slate-600">
             {activeFiltersCount > 0 && (
              <>
                <FilterIcon className="w-5 h-5"/>
                <p>{filteredAndSortedPapers.length} results found.</p>
                <button onClick={resetFilters} className="ml-2 text-sm text-blue-600 hover:underline flex items-center gap-1">
                  <XIcon className="w-4 h-4" />
                  Reset Filters
                </button>
              </>
             )}
             {activeFiltersCount === 0 && <p>{filteredAndSortedPapers.length} papers available.</p>}
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
             <SortAscendingIcon className="w-5 h-5 text-slate-500"/>
            <label htmlFor="sort" className="text-sm font-medium text-slate-700">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-2 py-1 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        
        {/* Results Grid */}
        {filteredAndSortedPapers.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-slate-800">No Papers Found</h3>
            <p className="mt-2 text-slate-500">Try adjusting your search or filters.</p>
             <button onClick={resetFilters} className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Reset Filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPapersPage;