export interface QuesitonType {
  question: string;
  variantsCorrectAnswers: string[];
}

export type CheckWordsType = (event: React.FormEvent<HTMLFormElement>) => void;

export interface ActiveTestType {
  questionNumber: number;
  isError: string;
  questions: QuesitonType[];
  checkWords: CheckWordsType;
  buttonNewQuestion: boolean;
  nextAnswer: () => Promise<void>;
  answerInput: any;
}

export interface FinishTestType {
  numberOfCorrectAnswers: number;
  numbersQuestions: number;
}
