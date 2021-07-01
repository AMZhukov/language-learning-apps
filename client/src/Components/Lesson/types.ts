export interface ILessonContent {
  tag: tags;
  className?: string;
  content: string;
  linkToImage?: string;
  altToImage?: string;
}

export type CreateContent = { item: ILessonContent; index: number };

type tags = 'div' | 'img' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface IFormNewContent {
  setFormNewContent: (newValue: boolean) => void;
  setLesson: (prevState: React.SetStateAction<ILessonContent[]>) => void;
}
