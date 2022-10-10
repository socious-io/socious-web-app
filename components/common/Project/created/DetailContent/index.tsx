import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ProjectItem from '@components/common/UserProfile/MainContent/ProjectItem';
import Title from '@components/common/UserProfile/MainContent/Title';
import {Modal} from '@components/common';
import OverviewProjectCard from '../../component/OverviewProjectCard';
import {useToggle} from 'hooks';
import AlertCard from '@components/common/AlertCard/AlertCard';
import EditProjectModal from '../../component/EditProjectModal';
import {defaultProject, Project, ProjectProps} from 'models/project';
import {useProjectContext} from '@components/common/Project/created/NewProject/context';

function Detail({
  project: {
    title,
    country_id,
    project_type,
    payment_range_higher,
    payment_range_lower,
    remote_preference,
    project_length,
    experience_level,
    description,
    payment_type,
    payment_scheme,
    payment_currency,
    status,
    causes_tags,
    skills,
  } = defaultProject,
}: ProjectProps) {
  const {state: closeProject, handlers: closeProjectHandlers} = useToggle();
  const {state: avoidClose, handlers: avoidCloseHandlers} = useToggle();
  const {ProjectContext, setProjectContext} = useProjectContext();

  console.log(causes_tags);
  const clickEditIcon = (formStep: number) => {
    setProjectContext({
      ...ProjectContext,
      isEditModalOpen: !ProjectContext.isEditModalOpen,
      title,
      country: String(country_id),
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
      status,
      causes_tags: causes_tags || [],
      skills,
      formStep,
    });
  };

  return (
    <div className="mb-10 w-full ">
      <div className="divide-y rounded-2xl border border-grayLineBased bg-white ">
        <div className="flex flex-row items-center justify-between px-4 ">
          <Title>{title}</Title>
        </div>
        <OverviewProjectCard
          title={title}
          description={description}
          country_id={country_id}
          project_type={project_type}
          project_length={project_length}
          payment_type={payment_type}
          payment_scheme={payment_scheme}
          payment_range_lower={payment_range_lower}
          payment_range_higher={payment_range_higher}
          experience_level={experience_level}
          remote_preference={remote_preference}
          payment_currency={payment_currency}
          status={status}
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
}

export default Detail;
