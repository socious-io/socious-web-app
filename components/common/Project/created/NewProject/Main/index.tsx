import {CreateProjectLayout} from '../Layout';
import React, {FC, useCallback, useEffect} from 'react';
import ProjectAbout from '../ProjectAbout';
import ProjectReview from '../ProjectReview';
import Congrats from '../Congrats';
import ProjectSkill from '../ProjectSkill';
import ProjectInfo from '../ProjectInfo';
import {useProjectContext, initContext} from '../context';
import {addQuestion, createProject} from '@api/projects/actions';
import {CreateProjectType, Project} from '@models/project';
import {toast} from 'react-toastify';
import {useGoogleMapsScript, Libraries} from 'use-google-maps-script';
import useSWR from 'swr';
import {get} from 'utils/request';
import {useUser} from '@hooks';
import ProjectQuestion from '../ProjectQuestions';
import QuestionDetail from '../QuestionDetail';
import {AddQuestionType, AddQuestionTypeWithId} from '@models/question';

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
  const isStep5 = ProjectContext.formStep === 5;
  const isStep6 = ProjectContext.formStep === 6;

  const onSubmit = async (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
    if (isStep4 && s) {
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
        experience_level: ProjectContext.experience_level,
      };

      if (ProjectContext.payment_scheme) {
        postBody.payment_scheme = ProjectContext.payment_scheme;
        if (postBody.payment_scheme === 'HOURLY') {
          if (ProjectContext.commitment_hours_higher)
            postBody.commitment_hours_higher =
              ProjectContext.commitment_hours_higher;
          if (ProjectContext.commitment_hours_lower)
            postBody.commitment_hours_lower =
              ProjectContext.commitment_hours_lower;
        }
      }
      if (postBody.payment_type === 'PAID') {
        if (ProjectContext.payment_range_lower)
          postBody.payment_range_lower = ProjectContext.payment_range_lower;
        if (ProjectContext.payment_range_higher)
          postBody.payment_range_higher = ProjectContext.payment_range_higher;
      }

      if (ProjectContext.city) postBody.city = ProjectContext.city;
      if (ProjectContext.payment_currency)
        postBody.payment_currency = ProjectContext.payment_currency;

      try {
        const project: Project = await createProject(postBody);
        // Adding Questions if any
        ProjectContext.newQuestions?.forEach(async (question, i) => {
          const {id, ...questionBody} = question;
          await addQuestion(project.id, questionBody);
        });
        mutate();
      } catch (error) {
        console.log('ERROR :---: ', error);
        toast.error(`${error}`);
      }
    }

    setProjectContext({
      ...ProjectContext,
      formStep: isStep5
        ? ProjectContext.formStep + 2
        : ProjectContext.formStep + 1,
    });
  };

  const onQuestionSubmit = useCallback(
    (newQuestion: AddQuestionType) => {
      if (ProjectContext.editQuestion?.id)
        setProjectContext({
          ...ProjectContext,
          newQuestions:
            ProjectContext.newQuestions?.map((question) =>
              question.id === ProjectContext.editQuestion?.id
                ? {...question, ...newQuestion}
                : question,
            ) || null,
          formStep: 3,
          editQuestion: null,
        });
      else
        setProjectContext({
          ...ProjectContext,
          newQuestions: [
            ...(ProjectContext.newQuestions ?? []),
            {id: Date.now().toString(), ...newQuestion},
          ],
          formStep: 3,
        });
    },
    [ProjectContext, setProjectContext],
  );

  useEffect(() => {
    if (!ProjectContext.isModalOpen) {
      setProjectContext(initContext);
    }
  }, [ProjectContext, setProjectContext]);

  const handleDeleteQuestion = useCallback(
    (id: string) => {
      setProjectContext({
        ...ProjectContext,
        newQuestions:
          ProjectContext.newQuestions?.filter(
            (question) => question.id !== id,
          ) ?? null,
      });
    },
    [ProjectContext, setProjectContext],
  );

  const pageDisplay = () => {
    if (isStep0) {
      return <ProjectAbout onSubmit={onSubmit} />;
    } else if (isStep1) {
      return <ProjectSkill onSubmit={onSubmit} rawSkills={skills} />;
    } else if (isStep2) {
      return <ProjectInfo onSubmit={onSubmit} />;
    } else if (isStep3) {
      return (
        <ProjectQuestion
          onSubmit={onSubmit}
          stepToEdit={6}
          deleteQuestion={handleDeleteQuestion}
        />
      );
    } else if (isStep4) {
      return <ProjectReview onSubmit={onSubmit} />;
    } else if (isStep5) {
      return <Congrats />;
    } else if (isStep6) {
      return <QuestionDetail onSubmit={onQuestionSubmit} />;
    }
  };

  return (
    <>
      {isLoaded && (
        <CreateProjectLayout
          title={
            isStep4 ? '' : isStep6 ? 'Add screener question' : 'Create Project'
          }
        >
          {pageDisplay()}
        </CreateProjectLayout>
      )}
    </>
  );
};

export default CreateProjectMain;
