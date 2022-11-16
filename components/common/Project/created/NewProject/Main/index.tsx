import React, {FC, useCallback, useState} from 'react';
import {addQuestion, createProject} from '@api/projects/actions';
import {toast} from 'react-toastify';
import {useGoogleMapsScript, Libraries} from 'use-google-maps-script';
import useSWR from 'swr';
import {joiResolver} from '@hookform/resolvers/joi';
import {useForm} from 'react-hook-form';

import ProjectAbout from '../ProjectAbout';
import ProjectReview from '../ProjectReview';
import Congrats from '../Congrats';
import ProjectSkill from '../ProjectSkill';
import ProjectInfo from '../ProjectInfo';
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
      useForm({resolver: joiResolver(schemaCreateProjectStep3)}),
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

  const onSubmit = async (s?: 'DRAFT' | 'EXPIRE' | 'ACTIVE') => {
    if (s) {
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
        console.log('PROJECT :---: ', project);
        // Adding Questions if any
        ProjectContext.newQuestions?.forEach(async (question, i) => {
          const {id, ...questionBody} = question;
          await addQuestion(project.id, questionBody);
          console.log('ADD QUESTION :__:', i);
        });
        mutate();
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

  return (
    <CreateProjectModal
      title={wizard.step === 4 ? '' : 'Create Project'}
      onBack={
        wizard.step > 0 ? () => wizard.setStep(wizard.step - 1) : undefined
      }
      onClose={() => setShowCreate(false)}
    >
      {showQuestionDetail ? (
        <QuestionDetail onSubmit={onQuestionSubmit} />
      ) : (
        <FormWizard wizard={wizard}>
          <ProjectAbout onSubmit={wizard.advance} />
          <ProjectSkill onSubmit={wizard.advance} rawSkills={skills} />
          <ProjectInfo onSubmit={wizard.advance} />
          <ProjectQuestions
            onSubmit={wizard.advance}
            onEditDetail={() => setShowQuestionDetail(true)}
          />
          <ProjectReview onSubmit={onSubmit} />
          <Congrats />
        </FormWizard>
      )}
    </CreateProjectModal>
  );
};

export default CreateProjectMain;
