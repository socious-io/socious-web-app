import {string} from 'joi';
import {Question} from './question';

export interface Project {
  id?: string;
  page_id?: number;
  title: string;
  description: string;
  country_id: number;
  project_type: string;
  project_length: string;
  payment_type: string;
  payment_scheme: string;
  payment_range_lower: string;
  payment_range_higher: string;
  experience_level: number;
  causes_tags?: Array<string>;
  skills?: Array<string>;
  payment_currency?: string;
  questions?: Array<Question>;
  project_status?: number;
  remote_preference: string;
  identity_id?: number;
  status?: string;
  created_at?: number;
  expires_at?: number;
}

export interface CreateProjectType {
  title: string;
  description: string;
  status?: string;
  payment_type?: string;
  payment_scheme?: string;
  remote_preference: string;
  payment_currency?: string;
  payment_range_lower?: string;
  payment_range_higher?: string;
  experience_level?: number;
  causes_tags?: Array<string>;
  country?: string;
  project_length?: string;
  project_type?: string;
  skills?: Array<string>;
}

export interface ApplyProjectType {
  cover_letter: string;
  share_contact_info?: boolean;
  cv_link?: string;
  cv_name?: string;
}
