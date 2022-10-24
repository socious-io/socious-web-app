import {ExperiencePayload} from '../Experiences.types';

export type ExperienceProps = {
  value: ExperiencePayload;
  onEdit: (experience: ExperiencePayload) => void;
};
