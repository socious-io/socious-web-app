import {memo} from 'react';
import MobileTopSkeleton, {
  TOption,
} from '@components/molecules/MobileTopSkeleton/MobileTopSkeleton';

type ProjectMobileTopProps = {
  selectedTab: string;
  projectId: string;
  owner: boolean;
};

const ProjectMobileTop = ({
  selectedTab,
  projectId,
  owner,
}: ProjectMobileTopProps) => {
  const publicList: TOption[] = [
    {
      id: 'OVERVIEW',
      value: 'Overview',
      url: `/app/projects/${projectId}`,
    },
  ];
  const privateList = [
    ...publicList,
    {
      id: 'APPLICANTS',
      value: 'Applicants',
      url: `/app/projects/created/${projectId}/applicants`,
    },
    {
      id: 'HIRED',
      value: 'Hired',
      url: `/app/projects/created/${projectId}/hired`,
    },
  ];
  return (
    <MobileTopSkeleton
      list={owner ? privateList : publicList}
      selectedTab={selectedTab}
    />
  );
};

export default memo(ProjectMobileTop);
