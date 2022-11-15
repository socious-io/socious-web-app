export interface Question {
  id: string;
  project_id: string;
  question: string;
  required: boolean;
  options: Array<string>;
  created_at: string;
  updated_at: string;
  old_id: string | null;
}

export interface AddQuestionType<T = string> {
  question: string;
  required: boolean;
  options?: T[] | null;
}

export interface AddQuestionTypeWithId extends AddQuestionType {
  id: string;
}
export type TQuestionsResponse = {questions: Question[]};
