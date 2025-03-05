export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IMedia {
  type: 'image' | 'link';
  url: string;
}

export interface IKnowledgeBlock {
  blockId: string;
  questionText: string;
  answers: IAnswer[];
  feedback: string;
  media?: IMedia;
  userAnswerId?: string;
}
