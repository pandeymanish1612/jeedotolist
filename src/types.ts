export type ExamType = 'JEE' | 'NEET';

export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';

export type ChapterStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type TopicStatus = 'NOT_STARTED' | 'THEORY_COMPLETED' | 'PYQ_SOLVED' | 'MOCK_TEST_TAKEN';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  status: TopicStatus;
  completionPercentage: number;
}

export interface MockTest {
  id: string;
  date: string;
  score: number;
  totalMarks: number;
}

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  type: 'CHAPTER_STUDY' | 'MOCK_TEST' | 'REVISION' | 'PYQ_PRACTICE';
  subject?: Subject;
  chapter?: string;
}

export interface DailyQuote {
  text: string;
  author: string;
}