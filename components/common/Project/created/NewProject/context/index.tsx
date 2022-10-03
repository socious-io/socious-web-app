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
  experience_level: number;
  status: string;
  project_type: string;
  project_length: string;
  country: string;
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
  experience_level: 0,
  status: '',
  project_type: '',
  project_length: '',
  country: '',
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
