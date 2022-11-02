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

export type TQuestionsResponse = {questions: Question[]};
