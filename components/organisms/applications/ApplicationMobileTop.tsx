import {memo} from 'react';
import MobileTopSkeleton from '@components/molecules/MobileTopSkeleton/MobileTopSkeleton';

type ApplicationMobileTopProps = {
  selectedTab: 'APPLICATION' | 'HIRED';
};

const ApplicationMobileTop = ({selectedTab}: ApplicationMobileTopProps) => {
  return (
    <MobileTopSkeleton
      list={[
        {
          id: 'APPLICATION',
          value: 'Applied',
          url: `/app/applications`,
        },
        {
          id: 'HIRED',
          value: 'Hired',
          url: `/app/hired`,
        },
      ]}
      selectedTab={selectedTab}
    />
  );
};

export default memo(ApplicationMobileTop);
