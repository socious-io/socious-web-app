import React, {FC, useCallback, useState} from 'react';
import {addQuestion, createProject} from '@api/projects/actions';
import {toast} from 'react-toastify';
import {useGoogleMapsScript, Libraries} from 'use-google-maps-script';
import useSWR from 'swr';
import {joiResolver} from '@hookform/resolvers/joi';
import {useForm} from 'react-hook-form';

import Congrats from '../Congrats';
import {useProjectContext} from '../context';
import {CreateProjectType, Project} from '@models/project';
import {get} from 'utils/request';
import {useUser} from '@hooks';
import QuestionDetail from '../QuestionDetail';
import {AddQuestionType} from '@models/question';
import {CreateProjectModal} from '@components/pages/project/create/CreateProjectModal';
import {useFormWizard} from 'hooks/useFormWizard';
import {
  schemaCreateProjectStep1,
  schemaCreateProjectStep2,
  schemaCreateProjectStep3,
} from '@api/projects/validation';
import {FormWizard} from '@components/organisms/forms/FormWizard';
import ProjectQuestions from '@components/pages/project/create/ProjectQuestions';
import Causes from '@components/pages/project/create/Causes';
import Skills from '@components/pages/project/create/Skills';
import ProjectInfo from '@components/pages/project/create/ProjectInfo';
import {Preview} from '@components/pages/project/create/Preview';

type CreateProjectMainType = {
  skills: any[];
  setShowCreate: (show: boolean) => void;
};
const libraries: Libraries = ['places'];

const CreateProjectMain: FC<CreateProjectMainType> = ({
  skills,
  setShowCreate,
}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  const [showQuestionDetail, setShowQuestionDetail] = useState<boolean>();
  const wizard = useFormWizard({
    methods: [
      useForm({resolver: joiResolver(schemaCreateProjectStep1)}),
      useForm({resolver: joiResolver(schemaCreateProjectStep2)}),
      useForm({
        resolver: joiResolver(schemaCreateProjectStep3),
        mode: 'onTouched',
      }),
    ],
  });
  const {currentIdentity} = useUser();
  const {mutate} = useSWR<any>(
    `/projects?identity=${currentIdentity?.id}`,
    get,
  );

  useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries,
  });

  const getProject = useCallback(
    (s: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
      const projectInfo = wizard.methods[2].getValues();
      const postBody: CreateProjectType = {
        title: projectInfo.title,
        description: projectInfo.description,
        remote_preference: projectInfo.remote_preference,
        country: projectInfo.country,
        project_type: projectInfo.project_type,
        project_length: projectInfo.project_length,
        payment_type: projectInfo.payment_type,
        causes_tags: wizard.methods[0].getValues().causes_tags,
        skills: wizard.methods[1].getValues().skills,
        status: s,
        experience_level: projectInfo.experience_level,
      };

      if (projectInfo.payment_scheme) {
        postBody.payment_scheme = projectInfo.payment_scheme;
        if (postBody.payment_scheme === 'HOURLY') {
          if (projectInfo.commitment_hours_higher)
            postBody.commitment_hours_higher =
              projectInfo.commitment_hours_higher;
          if (projectInfo.commitment_hours_lower)
            postBody.commitment_hours_lower =
              projectInfo.commitment_hours_lower;
        }
      }
      if (postBody.payment_type === 'PAID') {
        if (projectInfo.payment_range_lower)
          postBody.payment_range_lower = projectInfo.payment_range_lower;
        if (projectInfo.payment_range_higher)
          postBody.payment_range_higher = projectInfo.payment_range_higher;
      }

      if (projectInfo.city) postBody.city = projectInfo.city;
      if (projectInfo.payment_currency)
        postBody.payment_currency = projectInfo.payment_currency;

      return postBody;
    },
    [wizard.methods],
  );

  const onSubmit = async (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
    if (s) {
      try {
        const project: Project = await createProject(getProject(s));
        // Adding Questions if any
        ProjectContext.newQuestions?.forEach(async (question, i) => {
          const {id, ...questionBody} = question;
          await addQuestion(project.id, questionBody).catch((error) => {
            console.log('ERROR :---: ', error);
            toast.error(`${error}`);
          });
        });
        mutate();
        setShowCreate(false);
      } catch (error) {
        console.log('ERROR :---: ', error);
        toast.error(`${error}`);
      }
    }
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
          editQuestion: null,
        });
      else
        setProjectContext({
          ...ProjectContext,
          newQuestions: [
            ...(ProjectContext.newQuestions ?? []),
            {id: Date.now().toString(), ...newQuestion},
          ],
        });
      setShowQuestionDetail(false);
    },
    [ProjectContext, setProjectContext],
  );

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

  return (
    <CreateProjectModal
      title={
        wizard.step === 4
          ? ''
          : showQuestionDetail
          ? 'Add screener question'
          : 'Create Project'
      }
      onBack={wizard.step > 0 ? wizard.back : undefined}
      onClose={() => setShowCreate(false)}
    >
      {showQuestionDetail ? (
        <QuestionDetail onSubmit={onQuestionSubmit} />
      ) : (
        <FormWizard wizard={wizard}>
          <Causes onSubmit={wizard.advance} />
          <Skills onSubmit={wizard.advance} rawSkills={skills} />
          <ProjectInfo onSubmit={wizard.advance} />
          <ProjectQuestions
            onSubmit={wizard.advance}
            onEditDetail={() => setShowQuestionDetail(true)}
            deleteQuestion={handleDeleteQuestion}
          />
          <Preview onSubmit={onSubmit} getProject={getProject} />
          <Congrats />
        </FormWizard>
      )}
    </CreateProjectModal>
  );
};

export default CreateProjectMain;
