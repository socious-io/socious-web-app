import {TApplicant} from './applicant';
import {Project} from './project';

export type TMissionStatus =
  | 'COMPLETE'
  | 'ACTIVE'
  | 'CONFIRMED'
  | 'CANCELED'
  | 'KICKED_OUT';

export type TMissionApplicant = {closed_at: string | null} & Omit<
  TApplicant,
  | 'user'
  | 'project'
  | 'organization'
  | 'weekly_limit'
  | 'total_hours'
  | 'assignment_total'
  | 'due_date'
>;

export interface IMission {
  id: string;
  assignee_id: string;
  project_id: string;
  applicant_id: string | null;
  created_at: string;
  complete_at: null;
  updated_at: null;
  assigner_id: string;
  offer_id: string;
  status: TMissionStatus;
  applicant: TMissionApplicant | null;
  project: Project;
}
