import {memo} from 'react';
import MobileTopSkeleton from '@components/molecules/MobileTopSkeleton/MobileTopSkeleton';

type ProjectMobileTopProps = {selectedTab: string; projectId: string};

const ProjectMobileTop = ({selectedTab, projectId}: ProjectMobileTopProps) => {
  return (
    <MobileTopSkeleton
      list={[
        {
          id: 'OVERVIEW',
          value: 'Overview',
          url: `/app/projects/${projectId}`,
        },
        {
          id: 'APPLICANTS',
          value: 'Applicants',
          url: `/app/projects/created/${projectId}/applicants`,
        },
      ]}
      selectedTab={selectedTab}
    />
  );
};

export default memo(ProjectMobileTop);
