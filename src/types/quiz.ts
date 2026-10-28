export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type CategoryId = 
  | 'all'
  | 'ventilation'
  | 'waste'
  | 'water'
  | 'noise'
  | 'lighting'
  | 'radiation'
  | 'entomology';

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
  correctAnswer: OptionKey;
  category: CategoryId;
  categoryLabel: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuizMode = 'practice' | 'exam' | 'speed' | 'study';

export interface UserAnswerRecord {
  questionId: number;
  selectedOption: OptionKey;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}
