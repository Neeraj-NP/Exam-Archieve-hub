import { ExamPaper } from './types';

export const SEMESTER_SUBJECTS: { [key: number]: string[] } = {
  1: [
    'Coding and Communication',
    'Introduction to Communication and Ethics',
    'Programming and Methodology in Python',
    'Book Club',
    'Linear Algebra',
    'Calculus',
    'Mathematical Foundation of Computing',
  ],
  2: [
    'Data Handling in Python',
    'Data Structures and Algorithms',
    'Probability for Computer Science',
  ],
  3: [
    'Advanced Data Structure',
    'Object-Oriented Programming (Java)',
    'Database Management Systems (DBMS)',
    'Communication and Book Club',
  ],
  4: [
    'Artificial Intelligence',
    'Computer Organization Systems',
    'Advanced Object-Oriented Programming',
  ],
  5: [
    'Machine Learning',
    'Search Engines and Information Retrieval',
    'Operating System',
  ],
  6: [
    'Mining Massive Datasets',
    'Deep Learning',
    'Cyber-Physical Systems (CPS)',
  ],
  7: [
    'Placement Interview Preparation'
  ],
  8: [
    'Placement Interview Preparation'
  ]
};

export const ALL_SUBJECTS = [...new Set(Object.values(SEMESTER_SUBJECTS).flat())].sort();

export const YEARS = [2025, 2024, 2023, 2022];
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
export const EXAM_TYPES = ['IA 1', 'Mid Term', 'IA 2', 'End Sem'];

export const MOCK_PAPERS: ExamPaper[] = [
  {
    id: 1,
    title: 'Linear Algebra - Midterm Exam',
    subject: 'Linear Algebra',
    year: 2023,
    semester: 1,
    examType: 'Mid Term',
    url: '#',
    views: 1250,
    submittedAt: new Date('2023-10-15'),
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms - Final',
    subject: 'Data Structures and Algorithms',
    year: 2023,
    semester: 2,
    examType: 'End Sem',
    url: '#',
    views: 2800,
    submittedAt: new Date('2024-01-10'),
  },
  {
    id: 3,
    title: 'Artificial Intelligence - End of Term',
    subject: 'Artificial Intelligence',
    year: 2022,
    semester: 4,
    examType: 'End Sem',
    url: '#',
    views: 980,
    submittedAt: new Date('2022-12-20'),
  },
  {
    id: 4,
    title: 'Machine Learning - Midterm Paper',
    subject: 'Machine Learning',
    year: 2023,
    semester: 5,
    examType: 'Mid Term',
    url: '#',
    views: 1750,
    submittedAt: new Date('2023-10-25'),
  },
    {
    id: 5,
    title: 'Deep Learning - Final Exam 2022',
    subject: 'Deep Learning',
    year: 2022,
    semester: 6,
    examType: 'End Sem',
    url: '#',
    views: 1500,
    submittedAt: new Date('2023-01-05'),
  },
  {
    id: 6,
    title: 'Operating System Concepts - Final',
    subject: 'Operating System',
    year: 2023,
    semester: 5,
    examType: 'End Sem',
    url: '#',
    views: 1800,
    submittedAt: new Date('2023-05-30'),
  },
  {
    id: 7,
    title: 'Database Management Systems - Quiz 1',
    subject: 'Database Management Systems (DBMS)',
    year: 2023,
    semester: 3,
    examType: 'IA 1',
    url: '#',
    views: 1100,
    submittedAt: new Date('2023-09-18'),
  },
  {
    id: 8,
    title: 'Calculus - Final Exam 2021',
    subject: 'Calculus',
    year: 2021,
    semester: 1,
    examType: 'End Sem',
    url: '#',
    views: 1650,
    submittedAt: new Date('2021-12-15'),
  },
  {
    id: 9,
    title: 'Advanced Data Structure - Midterm',
    subject: 'Advanced Data Structure',
    year: 2022,
    semester: 3,
    examType: 'Mid Term',
    url: '#',
    views: 1300,
    submittedAt: new Date('2022-10-20'),
  },
  {
    id: 10,
    title: 'Mining Massive Datasets - Past Questions',
    subject: 'Mining Massive Datasets',
    year: 2023,
    semester: 6,
    examType: 'IA 2',
    url: '#',
    views: 2100,
    submittedAt: new Date('2023-11-05'),
  },
];