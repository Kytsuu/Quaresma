
export interface User {
  name: string;
  startDate: string;
}

export interface DayContent {
  day: number;
  reflection: string;
  prayer: string;
  purpose: string;
  whyReflect: string; // Motivational explanation for internal reflection
}

export interface BibleReflection {
  verse: string;
  reference: string;
  history: string;
}

export interface DayNote {
  failures: string;
  summary: string;
}

export interface AppState {
  user: User | null;
  completedDays: number[];
  selectedDay: number | null;
  lastCompletionTimestamp: number | null;
  dayNotes: Record<number, DayNote>; // Maps day number to user notes
  quizResult?: QuizResult | null;
}

export type VirtueProfile = 'Sabedoria' | 'Ação' | 'Contemplação' | 'Fé';

export interface QuizResult {
  profile: VirtueProfile;
  diagnostic: string;
  verse: string;
  reference: string;
}
