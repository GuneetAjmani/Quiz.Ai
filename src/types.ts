export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple' | 'yesno';
  content?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  showScore: boolean;
  selectedAnswers: string[];
}

export type Profession = 
  | "Software Developer"
  | "Data Scientist"
  | "Digital Marketing"
  | "Graphic Designer"
  | "Project Manager";