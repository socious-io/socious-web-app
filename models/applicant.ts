import {type} from 'os';
import {IdentityMeta} from './identity';
import {Project} from './project';

export type TApplicantsResponse = {
  items: TApplicant[];
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

export type TApplicantIdentity = IdentityMeta & {
  country: string;
  city: string;
};

export type TAttachment = {
  id: string;
  filename: string;
  url: string;
};

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
  attachment: TAttachment | null;
  user: TApplicantIdentity;
  project: Project;
  organization: {
    id: string;
    created_at: string;
    meta: IdentityMeta;
  };
  answers: TAnswer[];
};

export type TAnswer = {
  id: string;
  project_id: string;
  question_id: string;
  applicant_id: string;
  answer: string | null;
  selected_option: number | null;
  created_at: string;
  updated_at: string;
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
