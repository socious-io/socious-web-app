export type ExperiencePayload = {
  org_id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
};

export type Experience = ExperiencePayload;

export type ExperiencesProps = {
  orgId: string;
  list: Experience[];
  add: (experience: ExperiencePayload) => void;
  update: (experience: ExperiencePayload) => void;
};

export type ModalState = 'add' | 'edit' | 'close';
