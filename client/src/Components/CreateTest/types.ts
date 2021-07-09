export interface IQuestion {
  _id?: string;
  question: string;
  variantsCorrectAnswers: string[];
  variantsNotCorrectAnswers: string[];
}
export interface IListOfQuestions {
  questions: IQuestion[];
  deleteCurrentTest: (index: number) => void;
}
export interface IQuestionRender {
  question: IQuestion;
  index: number;
  deleteCurrentTest: (index: number) => void;
}
