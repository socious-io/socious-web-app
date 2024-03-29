import {TProjectStatus} from '@models/project';
import {AddQuestionTypeWithId, Question} from '@models/question';
import {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';

export type TProjectContext = {
  causes_tags: string[];
  title: string;
  description: string;
  isModalOpen: boolean;
  formStep: number;
  remote_preference: string;
  payment_type: string;
  payment_scheme: string;
  payment_currency: string;
  payment_range_lower: string;
  payment_range_higher: string;
  commitment_hours_higher: string;
  commitment_hours_lower: string;
  experience_level: number;
  job_category_id: string;
  project_type: string;
  project_length: string;
  country: string;
  skills: string[];
  isEditModalOpen: boolean;
  isApplyModalOpen: boolean;
  cover_letter: string;
  share_contact_info: boolean;
  cv_link: string;
  cv_name: string;
  city: string;
  status: TProjectStatus;
  attachment: any;
  questions: Question[] | null;
  editQuestion: any | null;
  newQuestions: AddQuestionTypeWithId[] | null;
};

export const initContext: TProjectContext = {
  isModalOpen: false,
  causes_tags: [],
  title: '',
  description: '',
  remote_preference: '',
  formStep: 0,
  payment_type: '',
  payment_scheme: '',
  payment_currency: '',
  payment_range_lower: '',
  payment_range_higher: '',
  commitment_hours_higher: '',
  commitment_hours_lower: '',
  experience_level: 0,
  job_category_id: '',
  project_type: '',
  project_length: '',
  country: '',
  skills: [],
  isEditModalOpen: false,
  isApplyModalOpen: false,
  cover_letter: '',
  share_contact_info: false,
  cv_link: '',
  cv_name: '',
  city: '',
  status: 'DRAFT',
  attachment: '',
  questions: null,
  editQuestion: null,
  newQuestions: null,
};

const ProjectContext = createContext<{
  ProjectContext: TProjectContext;
  setProjectContext: Dispatch<SetStateAction<TProjectContext>>;
}>({
  ProjectContext: initContext,
  setProjectContext: (a: any) => null,
});

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

export const ProjectContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [projectContext, setProjectContext] =
    useState<TProjectContext>(initContext);

  const projectContextValue: {
    ProjectContext: TProjectContext;
    setProjectContext: Dispatch<SetStateAction<TProjectContext>>;
  } = {
    ProjectContext: projectContext,
    setProjectContext: setProjectContext,
  };

  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
