import { IUseInput } from '../../hooks/useInput';

export interface QuesitonType {
  question: string;
  variantsCorrectAnswers: string[];
}

export type CheckWordsType = (event: React.FormEvent<HTMLFormElement>) => void;

export interface ActiveTestType {
  questionNumber: number;
  isError: string;
  questions: QuesitonType[];
  checkWords: (event: React.FormEvent<HTMLFormElement>) => void;
  answerInput: IUseInput;
  isButtonNewQuestion: boolean;
  nextAnswer: () => void;
}

export interface FinishTestType {
  numberOfCorrectAnswers: number;
  numbersQuestions: number;
}
