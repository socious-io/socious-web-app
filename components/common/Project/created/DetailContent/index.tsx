import {FC, useCallback, useMemo} from 'react';
import {toast} from 'react-toastify';
import {Libraries, useGoogleMapsScript} from 'use-google-maps-script';
import useSWR, {useSWRConfig} from 'swr';
import Image from 'next/image';

// Components
import {Modal} from '@components/common';
import AlertCard from '@components/common/AlertCard/AlertCard';
import {
  useProjectContext,
  initContext,
} from '@components/common/Project/created/NewProject/context';

import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import Title from '@components/common/UserProfile/MainContent/Title';
import OverviewProjectCard from '../../component/OverviewProjectCard';
import EditProjectModal from '../../component/EditProjectModal';
import ProjectMobileTop from '../../ProjectMobileTop/ProjectMobileTop';
import {
  CreateProjectLayout,
  ProjectInfo,
  ProjectAbout,
  ProjectSkill,
  ProjectQuestion,
  QuestionDetail,
} from '@components/common/Project/created/NewProject';
import editSrc from 'asset/icons/edit.svg';

// Hooks
import {useToggle, useUser} from 'hooks';

// Utils/Actions
import {removeQuestion, updateProjectById} from '@api/projects/actions';
import {addQuestion, updateQuestion} from '@api/projects/actions';
import {get} from 'utils/request';

// Types
import {CreateProjectType, Project, ProjectProps} from 'models/project';
import {AddQuestionType, Question, TQuestionsResponse} from '@models/question';
import {twMerge} from 'tailwind-merge';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';

// Library
const libraries: Libraries = ['places'];

export const QuestionsCard: FC<{
  questions?: Question[] | AddQuestionType[];
  goToEdit?: () => void;
  className?: string;
}> = ({questions, goToEdit, className}) => {
  return (
    <div className={twMerge('space-y-6 p-4', className && className)}>
      <div className="flex items-center justify-between ">
        <Title>Screening questions</Title>
        {goToEdit && (
          <div className="relative  h-5 w-5 ">
            <div className="cursor-pointer" onClick={goToEdit}>
              <Image
                src={editSrc}
                className="fill-warning"
                alt="dislike"
                layout="fill"
              />
            </div>
          </div>
        )}
      </div>
      {questions && (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index + ' ' + question.question}>
              <p>{'Question ' + (index + 1)}</p>
              <span className="font-worksans block  text-base text-graySubtitle sm:text-sm">
                {question.question}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface DetailProps extends ProjectProps {
  rawSkills: Skill[];
}

const Detail: FC<DetailProps> = ({project, questions, rawSkills}) => {
  const {
    title,
    payment_range_higher,
    payment_range_lower,
    remote_preference,
    project_length,
    project_type,
    country,
    description,
    payment_type,
    experience_level,
    payment_currency,
    payment_scheme,
    causes_tags,
    skills,
    status,
    city,
    commitment_hours_higher,
    commitment_hours_lower,
  } = project;
  const {state: closeProject, handlers: closeProjectHandlers} = useToggle();
  const {state: avoidClose, handlers: avoidCloseHandlers} = useToggle();
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {currentIdentity} = useUser();

  const owner = useMemo(
    () => !!currentIdentity && currentIdentity.id === project.identity_id,
    [currentIdentity, project.identity_id],
  );

  const {mutate} = useSWRConfig();
  const {mutate: getProject} = useSWR<Project>(
    `/projects?identity=${currentIdentity?.id}`,
    get,
  );

  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  // STEPS (Different Edit Mode)
  const isStep0 = ProjectContext.formStep === 0;
  const isStep1 = ProjectContext.formStep === 1;
  const isStep2 = ProjectContext.formStep === 2;
  const isStep3 = ProjectContext.formStep === 3;
  const isStep4 = ProjectContext.formStep === 4;

  const {editQuestion} = ProjectContext;

  const clickEditIcon = (formStep: number) => {
    setProjectContext({
      ...ProjectContext,
      isEditModalOpen: !ProjectContext.isEditModalOpen,
      title,
      country,
      description,
      payment_type,
      experience_level,
      payment_currency: payment_currency || '',
      // @ts-ignore
      payment_range_higher,
      // @ts-ignore
      payment_range_lower,
      payment_scheme,
      project_length,
      project_type,
      remote_preference,
      commitment_hours_higher,
      commitment_hours_lower,
      causes_tags: causes_tags || [],
      skills,
      formStep,
      status,
      city,
      questions: questions ?? null,
    });
  };

  const onSubmit = async (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
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
      status: s ? s : ProjectContext.status,
      experience_level: ProjectContext.experience_level,
      job_category_id: ProjectContext.job_category_id,
    };

    if (ProjectContext.payment_currency)
      postBody.payment_currency = ProjectContext.payment_currency;
    if (ProjectContext.city) postBody.city = ProjectContext.city;

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

    try {
      console.log('postBody: ', postBody);
      const response = await updateProjectById(project.id, postBody);
      mutate(`/projects/${project.id}`, response, {revalidate: false});
      getProject();
      setProjectContext(initContext);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const onSubmitQuestion: (questionBody: AddQuestionType) => void = useCallback(
    async (questionBody: AddQuestionType) => {
      try {
        let questions: Question[] | null = ProjectContext.questions;
        if (editQuestion && editQuestion.project_id) {
          const response = await updateQuestion(
            editQuestion.project_id,
            editQuestion.id,
            questionBody,
          );
          questions?.forEach((question, index) => {
            if (questions)
              questions[index] =
                question.id === response.id ? response : question;
          });
        } else {
          const response = await addQuestion(project.id, questionBody);
          questions = [...(questions ?? []), response];
        }
        // Mutation for questionss
        if (questions?.[0])
          mutate(
            `/projects/${project.id}/questions`,
            async () => ({questions: questions}),
            {
              revalidate: false,
            },
          );
        setProjectContext({
          ...ProjectContext,
          editQuestion: null,
          questions: questions,
          formStep: 3,
        });
      } catch (error: any) {
        if (error.isAxiosError && error.response?.data?.error)
          toast.error(`Error: ${error.response?.data?.error}`);
      }
    },
    [ProjectContext, editQuestion, mutate, project.id, setProjectContext],
  );

  const handleDeleteQuestion = useCallback(
    async (id: string) => {
      try {
        await removeQuestion(project.id, id);
        const newQuestions =
          ProjectContext.questions?.filter((question) => question.id !== id) ??
          null;
        mutate(
          `/projects/${project.id}/questions`,
          async () => ({questions: newQuestions}),
          {
            revalidate: false,
          },
        );
        setProjectContext({
          ...ProjectContext,
          questions: newQuestions,
        });
      } catch (error: any) {
        if (error.isAxiosError && error.response?.data?.error)
          toast.error(`Error: ${error.response?.data?.error}`);
      }
    },
    [ProjectContext, mutate, project.id, setProjectContext],
  );

  // EDIT MODALS
  const PageDisplay = () => {
    if (isStep0 && isLoaded) {
      return <ProjectInfo onSubmit={onSubmit} />;
    } else if (isStep1) {
      return <ProjectAbout onSubmit={onSubmit} />;
    } else if (isStep2) {
      return <ProjectSkill onSubmit={onSubmit} rawSkills={rawSkills} />;
    } else if (isStep3) {
      return (
        <ProjectQuestion
          onSubmit={() => setProjectContext(initContext)}
          deleteQuestion={handleDeleteQuestion}
        />
      );
    } else if (isStep4) {
      return <QuestionDetail onSubmit={onSubmitQuestion} />;
    }
  };

  return (
    <div className="mb-10 w-full ">
      <ProjectMobileTop
        selectedTab="OVERVIEW"
        projectId={project.id}
        owner={project?.identity_id === currentIdentity?.id}
      />
      <div className="divide-y border border-grayLineBased bg-white sm:rounded-2xl ">
        <div className="flex flex-row items-center justify-center px-4 ">
          <Title>{title}</Title>
        </div>
        <OverviewProjectCard
          project={project}
          onclick={owner ? () => clickEditIcon(0) : undefined}
        />
        <ProjectItem
          items={causes_tags}
          title="Social causes"
          isEdit={owner}
          onclick={() => clickEditIcon(1)}
        />
        <ProjectItem
          items={skills}
          title="Skills"
          isEdit={owner}
          onclick={() => clickEditIcon(2)}
        />
        {(owner || (questions && questions.length)) && (
          <QuestionsCard
            questions={questions}
            goToEdit={owner ? () => clickEditIcon(3) : undefined}
          />
        )}
      </div>
      <Modal isOpen={closeProject} onClose={closeProjectHandlers.off}>
        <EditProjectModal onSubmit={() => {}} />
        <Modal.CloseButton />
      </Modal>
      <Modal isOpen={avoidClose} onClose={avoidCloseHandlers.off}>
        <AlertCard
          title={''}
          description={
            'You can not close projects while there are still on-going assignments. Please end all assignments before closing the project.'
          }
          buttonTitleAccept={'Back'}
          buttonTitleCancel={''}
          isOpen={false}
          titleColor={'text-error'}
          close={avoidCloseHandlers.off}
        />
      </Modal>
      {/* EDIT PROJECT MODAL COLLECTIONS */}
      <CreateProjectLayout
        isEdit
        title={
          isStep3
            ? 'Screening questions'
            : isStep4
            ? 'Add screener question'
            : 'Edit Project'
        }
      >
        {PageDisplay()}
      </CreateProjectLayout>
    </div>
  );
};

export default Detail;
