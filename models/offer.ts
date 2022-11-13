import {Project} from './project';

export type TOfferStatus =
  | 'PENDING'
  | 'WITHDRAWN'
  | 'APPROVED'
  | 'HIRED'
  | 'CLOSED'
  | 'CANCELED';

export interface IOffer {
  id: string;
  project_id: string;
  recipient_id: string;
  offerer_id: string;
  applicant_id: string;
  assignment_total: null | number;
  offer_rate: null | number;
  offer_message: string;
  status: string;
  payment_type: string | null;
  due_date: string | null;
  payment_scheme: string | null;
  weekly_limit: number | null;
  total_hours: number | null;
  created_at: string;
  updated_at: string;
}

export interface IOfferWithProject extends IOffer {
  project: Project;
}
