export interface Questionnaire {
  id: number;
  question_type_id: number;
  question: string;
  is_required: boolean;
  option_1?: string;
  option_2?: string;
  option_3?: string;
  option_4?: string;
  option_5?: string;
}
