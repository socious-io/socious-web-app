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
  applicant_id: string | null;
  assignment_total: string | null;
  offer_rate: string | null;
  offer_message: string;
  status: TOfferStatus;
  payment_type: string | null;
  due_date: string | null;
  payment_scheme: string | null;
  weekly_limit: string | null;
  total_hours: number;
  created_at: string;
  updated_at: string;
}

export interface IOfferWithProject extends IOffer {
  project: Project;
}
