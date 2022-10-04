export interface Question {
  id: number;
  project_id: string;
  question: string;
  required: boolean;
  options: Array<string>;
  created_at: number;
  updated_at: number;
  old_id: number | null;
}
