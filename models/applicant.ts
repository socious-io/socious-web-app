import {IdentityMeta} from './identity';

export type TApplicantsResponse = {
  items: any[];
  limit: number;
  page: number;
  total_count: number;
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
  // status: 'PENDING';
  status: string;
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
