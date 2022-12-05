import {IdentityMeta, IdentityType} from './identity';
import {Question} from './question';

export type TProjectStatus = 'DRAFT' | 'EXPIRE' | 'ACTIVE';

export type TProjectIdentityMeta = Required<
  Omit<IdentityMeta, 'username' | 'avatar'>
> & {
  address?: string;
  city?: string;
  country?: string;
};
export interface Project {
  id: string;
  title: string;
  description: string;
  applicants: number;
  country: string;
  project_type: string;
  project_length: string;
  payment_type: string;
  payment_scheme: string;
  payment_range_lower?: string | null;
  payment_range_higher?: string | null;
  experience_level: number;
  causes_tags: Array<string>;
  skills: Array<string>;
  payment_currency?: string;
  remote_preference: string;
  identity_id: string;
  identity_type: IdentityType;
  identity_meta: TProjectIdentityMeta;
  status: TProjectStatus;
  created_at: string;
  expires_at?: string;
  applied: boolean;
  updated_at: string;
  commitment_hours_higher: string;
  commitment_hours_lower: string;
  city: string;
  weekly_hours_lower: string | null;
  weekly_hours_higher: string | null;
  deleted_at: string | null;
  old_id: string | null;
  other_party_id: string | null;
  other_party_title: string | null;
  other_party_url: string | null;
  search_tsv: string;
  total_escrow_amount: null | string | number;
}

export interface CreateProjectType {
  title: string;
  description: string;
  payment_type: string;
  payment_scheme?: string;
  remote_preference: string;
  payment_currency?: string;
  payment_range_lower?: string;
  payment_range_higher?: string;
  commitment_hours_higher?: string;
  commitment_hours_lower?: string;
  experience_level: number;
  causes_tags: Array<string>;
  country: string;
  project_length: string;
  project_type?: string;
  skills: Array<string>;
  city?: string;
  status: string;
}

export type TAnswer = {
  id: string;
  selected_option?: number;
  answer?: string;
};
export interface ApplyProjectType {
  cover_letter: string;
  share_contact_info?: boolean;
  cv_link?: string;
  cv_name?: string;
  attachment?: string;
  answers?: TAnswer[];
}

export interface ProjectProps {
  project: Project;
  questions?: Question[];
}

export const defaultProject = {
  payment_currency: '',
  status: '',
  causes_tags: [],
  skills: [],
} as unknown as Project;

export interface IProjectsResponse {
  items: Project[];
  limit: number;
  page: number;
  total_count: number;
}
