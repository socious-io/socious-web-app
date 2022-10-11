import {CreateProjectLayout} from '../Layout';
import React, {FC, useEffect} from 'react';
import ProjectAbout from '../ProjectAbout';
import ProjectReview from '../ProjectReview';
import Congrats from '../Congrats';
import ProjectSkill from '../ProjectSkill';
import ProjectInfo from '../ProjectInfo';
import {useProjectContext, initContext} from '../context';
import {createProject} from '@api/projects/actions';
import {CreateProjectType} from '@models/project';
import {toast} from 'react-toastify';

type CreateProjectMainType = {
  skills: any[];
};

const CreateProjectMain: FC<CreateProjectMainType> = ({skills}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();

  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const isStep3 = ProjectContext.formStep === 3;
  const isStep4 = ProjectContext.formStep === 4;

  const onSubmit = async () => {
    if (isStep3) {
      const postBody: CreateProjectType = {
        title: ProjectContext.title,
        description: ProjectContext.description,
        remote_preference: ProjectContext.remote_preference,
        country: ProjectContext.country,
        project_type: ProjectContext.project_type,
        project_length: ProjectContext.project_length,
        payment_type: ProjectContext.payment_type,
        payment_range_lower: `${ProjectContext.payment_range_lower}`,
        payment_range_higher: `${ProjectContext.payment_range_higher}`,
        experience_level: ProjectContext.experience_level,
        causes_tags: ProjectContext.causes_tags,
        skills: ProjectContext.skills,
      };

      if (ProjectContext.payment_currency)
        postBody.payment_currency = ProjectContext.payment_currency;
      if (ProjectContext.payment_scheme)
        postBody.payment_scheme = ProjectContext.payment_scheme;

      try {
        await createProject(postBody);
      } catch (error) {
        toast.error(`${error}`);
      }
    }
    setProjectContext({
      ...ProjectContext,
      formStep: ProjectContext.formStep + 1,
    });
  };
  useEffect(() => {
    if (!ProjectContext.isModalOpen) {
      setProjectContext(initContext);
    }
  }, [ProjectContext, setProjectContext]);

  const pageDisplay = () => {
    if (isStep0) {
      return <ProjectAbout onSubmit={onSubmit} />;
    } else if (isStep1) {
      return <ProjectSkill onSubmit={onSubmit} rawSkills={skills} />;
    } else if (isStep2) {
      return <ProjectInfo onSubmit={onSubmit} />;
    } else if (isStep3) {
      return <ProjectReview onSubmit={onSubmit} />;
    } else if (isStep4) {
      return <Congrats />;
    }
  };

  return (
    <CreateProjectLayout title={isStep4 ? '' : 'Create Project'}>
      {pageDisplay()}
    </CreateProjectLayout>
  );
};

export default CreateProjectMain;
