export interface ExamPaper {
  id: number;
  title: string;
  subject: string;
  year: number;
  semester: number;
  examType: string;
  url: string;
  views: number;
  submittedAt: Date;
}