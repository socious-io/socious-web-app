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
import {useGoogleMapsScript, Libraries} from 'use-google-maps-script';
import useSWR from 'swr';
import {get} from 'utils/request';
import {useUser} from '@hooks';

type CreateProjectMainType = {
  skills: any[];
};
const libraries: Libraries = ['places'];

const CreateProjectMain: FC<CreateProjectMainType> = ({skills}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {currentIdentity} = useUser();
  const {mutate} = useSWR<any>(
    `/projects?identity=${currentIdentity?.id}`,
    get,
  );

  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const isStep3 = ProjectContext.formStep === 3;
  const isStep4 = ProjectContext.formStep === 4;

  const onSubmit = async (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
    if (isStep3 && s) {
      const postBody: CreateProjectType = {
        title: ProjectContext.title,
        description: ProjectContext.description,
        remote_preference: ProjectContext.remote_preference,
        country: ProjectContext.country,
        project_type: ProjectContext.project_type,
        project_length: ProjectContext.project_length,
        payment_type: ProjectContext.payment_type,
        causes_tags: ProjectContext.causes_tags,
        skills: ProjectContext.skills,
        status: s,
      };

      if (ProjectContext.city) postBody.city = ProjectContext.city;
      if (ProjectContext.payment_range_lower)
        postBody.payment_range_lower = ProjectContext.payment_range_lower;
      if (ProjectContext.payment_range_higher)
        postBody.payment_range_higher = ProjectContext.payment_range_higher;
      if (ProjectContext.commitment_hours_higher)
        postBody.commitment_hours_higher =
          ProjectContext.commitment_hours_higher;
      if (ProjectContext.commitment_hours_lower)
        postBody.commitment_hours_lower = ProjectContext.commitment_hours_lower;
      if (ProjectContext.payment_currency)
        postBody.payment_currency = ProjectContext.payment_currency;
      if (ProjectContext.payment_scheme)
        postBody.payment_scheme = ProjectContext.payment_scheme;

      try {
        await createProject(postBody);
        mutate();
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
    <>
      {isLoaded && (
        <CreateProjectLayout title={isStep4 ? '' : 'Create Project'}>
          {pageDisplay()}
        </CreateProjectLayout>
      )}
    </>
  );
};

export default CreateProjectMain;
