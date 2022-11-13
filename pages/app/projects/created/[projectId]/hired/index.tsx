import ProjectMobileTop from '@components/common/Project/ProjectMobileTop/ProjectMobileTop';
import HiredContent from '@components/common/Project/SideBar/HireContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {useUser} from '@hooks';
import {Project} from '@models/project';
import {GeneralLayout} from 'layout';
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';
import {get} from 'utils/request';

const Hired = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const {currentIdentity} = useUser();

  const {data: project, error} = useSWR<Project>(
    projectId ? `/projects/${projectId}` : null,
    get,
  );
  // 404 || 500 || Invalid Proejct, redirect to home
  if (
    error?.response?.status === 404 ||
    error?.response?.status === 500 ||
    // '"value" must be a valid GUID' || 'Not matched'
    error?.response?.status === 400
  ) {
    router.back();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Invalid Project. Returning back.</h3>
      </div>
    );
  }

  if (!project && !error && !project) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Loading.</h3>
      </div>
    );
  }

  // If not owner
  if (
    project &&
    currentIdentity &&
    project.identity_id !== currentIdentity.id
  ) {
    router.back();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
        <h3 className="pt-4">Access Denied.</h3>
      </div>
    );
  }

  return (
    <GeneralLayout
      hasNavbar
      hasDetailNavbar
      detailNavbarTitle={project?.title ?? 'Project Title'}
    >
      <SideBar
        selectBar={'HIRE'}
        projectId={projectId as string}
        data={project}
      />
      <div className="w-full">
        <div className="pb-4 md:hidden">
          <ProjectMobileTop
            selectedTab="HIRED"
            projectId={project?.id ?? (projectId as string)}
            owner={project?.identity_id === currentIdentity?.id}
          />
        </div>
        <HiredContent
          type="FULL"
          projectId={project?.id ?? (projectId as string)}
        />
      </div>
    </GeneralLayout>
  );
};

export default Hired;
