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
      };

      if (ProjectContext.experience_level)
        postBody.experience_level = ProjectContext.experience_level;
      if (ProjectContext.payment_currency)
        postBody.payment_currency = ProjectContext.payment_currency;
      if (ProjectContext.payment_range_higher)
        postBody.payment_range_higher = ProjectContext.payment_range_higher;
      if (ProjectContext.payment_range_lower)
        postBody.payment_range_lower = ProjectContext.payment_range_lower;
      if (ProjectContext.payment_scheme)
        postBody.payment_scheme = ProjectContext.payment_scheme;
      if (ProjectContext.payment_type)
        postBody.payment_type = ProjectContext.payment_type;
      if (ProjectContext.status) postBody.status = ProjectContext.status;
      if (ProjectContext.country) postBody.country = ProjectContext.country;
      if (ProjectContext.project_length)
        postBody.project_length = ProjectContext.project_length;
      if (ProjectContext.causes_tags)
        postBody.causes_tags = ProjectContext.causes_tags;
      if (ProjectContext.project_type)
        postBody.project_type = ProjectContext.project_type;
      if (ProjectContext.skills) postBody.skills = ProjectContext.skills;

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
  }, [ProjectContext]);

  const PageDisplay = () => {
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
      {PageDisplay()}
    </CreateProjectLayout>
  );
};

export default CreateProjectMain;
