import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import useSWR from 'swr';

// Components
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Project/SideBar/SideBar';

// Utils/hooks
import {get} from 'utils/request';
import {useUser} from '@hooks';

// Types
import ProjectMobileTop from '@components/common/Project/ProjectMobileTop/ProjectMobileTop';
import OffersContent from '@components/common/Project/SideBar/OffersContent';
import {Project} from '@models/project';

const Offers = () => {
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

  // If not owner
  if (project?.identity_id !== currentIdentity?.id) {
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
        selectBar={'OFFER'}
        projectId={projectId as string}
        data={project}
      />
      <div className="w-full">
        <div className="pb-4 md:hidden">
          <ProjectMobileTop
            selectedTab="OFFERS"
            projectId={project?.id ?? (projectId as string)}
            owner={project?.identity_id === currentIdentity?.id}
          />
        </div>
        <OffersContent projectId={projectId as string} type="FULL" />
      </div>
    </GeneralLayout>
  );
};

export default Offers;
