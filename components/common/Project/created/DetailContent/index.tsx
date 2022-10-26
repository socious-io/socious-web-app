import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import Title from '@components/common/UserProfile/MainContent/Title';

import {Modal} from '@components/common';
import OverviewProjectCard from '../../component/OverviewProjectCard';
import {useToggle} from 'hooks';
import AlertCard from '@components/common/AlertCard/AlertCard';
import EditProjectModal from '../../component/EditProjectModal';
import {ProjectProps} from 'models/project';
import {useProjectContext} from '@components/common/Project/created/NewProject/context';
import {FC} from 'react';
import {Question} from '@models/question';
import editSrc from 'asset/icons/edit.svg';
import Image from 'next/image';
import ProjectMobileTop from '../../ProjectMobileTop/ProjectMobileTop';

const QuestionsCard: FC<{questions?: Question[]; goToEdit: () => void}> = ({
  questions,
  goToEdit,
}) => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between ">
        <Title>Screening questions</Title>
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
      </div>
      {questions && (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id}>
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

export type DetailProps = ProjectProps & {questions?: Question[]};
const Detail: FC<DetailProps> = ({project, questions}) => {
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
      payment_range_higher,
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

  return (
    <div className="mb-10 w-full ">
      {/* <ProjectNav selectedTab="OVERVIEW" projectId={project.id} /> */}
      <ProjectMobileTop selectedTab="OVERVIEW" projectId={project.id} />
      <div className="divide-y border border-grayLineBased bg-white sm:rounded-2xl ">
        <div className="flex flex-row items-center justify-center px-4 ">
          <Title>{title}</Title>
        </div>
        <OverviewProjectCard
          project={project}
          onclick={() => clickEditIcon(0)}
        />
        <ProjectItem
          items={causes_tags}
          title="Social causes"
          isEdit
          onclick={() => clickEditIcon(1)}
        />
        <ProjectItem
          items={skills}
          title="Skills"
          isEdit
          onclick={() => clickEditIcon(2)}
        />
        <QuestionsCard
          questions={questions}
          goToEdit={() => clickEditIcon(3)}
        />
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
    </div>
  );
};

export default Detail;
