export interface ExamPaper {
  id: number;
  title: string;
  subject: string;
  year: number;
  semester: number;
  examType: string;
  url: string; // For mock papers or external links
  fileContent?: string; // For base64 encoded file data
  fileType?: string; // e.g., 'application/pdf'
  views: number;
  submittedAt: Date;
  submittedBy?: string;
}

export interface User {
  id: number;
  email: string;
  role: 'student' | 'admin';
}