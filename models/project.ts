import { Passion } from "./passion";
import { Questionnaire } from "./question";
import { Skill } from "./skill";

export interface Project {
  id?: number;
  page_id?: number;
  title: string;
  description: string;
  country_id: number;
  project_type: number;
  project_length: number;
  payment_type: number;
  payment_scheme: number;
  payment_range_lower: string;
  payment_range_higher: string;
  experience_level: number;
  passions?: Array<number> | Array<Passion>;
  skills?: Array<number> | Array<Skill>;
  payment_currency?: string;
  questionnaire?: Array<Questionnaire>;
  project_status?: number;
}
