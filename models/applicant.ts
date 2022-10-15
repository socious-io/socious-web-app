import {IdentityMeta} from './identity';
import {TApplicantStatus} from '@socious/data';

export type TApplicantsResponse = {
  items: any[];
  limit: number;
  page: number;
  total_count: number;
};

export type TApplicantStatus =
  | 'PENDING'
  | 'OFFERED'
  | 'REJECTED'
  | 'WITHRAWN'
  | 'APPROVED'
  | 'HIRED';

export type TApplicant = {
  id: string;
  project_id: string;
  user_id: string;
  cover_letter?: string;
  payment_rate: string | null;
  offer_rate: string | null;
  offer_message: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  assignment_total: number;
  due_date: string | null;
  feedback: string | null;
  status: TApplicantStatus;
  payment_type: string | null;
  old_id: string | null;
  weekly_limit: string | null;
  total_hours: string;
  cv_link: string | null;
  cv_name: string | null;
  share_contact_info: string | null;
  attachment: string | null;
  user: IdentityMeta;
};

export type TOfferApplicant = {
  offer_rate: string;
  offer_message: string;
  assignment_total: number;
  due_date: Date;
};

export type TApplicantsByStatus = Record<
  'PENDING' | 'OFFERED' | 'REJECTED' | 'WITHRAWN' | 'APPROVED' | 'HIRED',
  TApplicant[]
>;
