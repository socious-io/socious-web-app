import {FC} from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

// Hooks
import {useToggle} from '@hooks';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

// Components
import ProjectItem from '@components/common/UserProfile/RightPane/ProjectItem';
import HeaderBox from '@components/common/Project/component/HeaderBox';
import {Button} from '@components/common';

// Types
import {TProjectStatus} from '@models/project';
type ProjectByStatusProps = {
  status: TProjectStatus;
  identityId: string;
  title: string;
  rounded?: boolean;
};

const ProjectsByStatus: FC<ProjectByStatusProps> = ({
  status,
  identityId,
  title,
  rounded = true,
}) => {
  const {state: expandState, handlers: expandHandler} = useToggle();

  const {flattenData, loadMore, seeMore, rawResponse} = useInfiniteSWR(
    identityId && status
      ? `/projects?identity_id=${identityId}&status=${status}`
      : null,
  );

  const size =
    rawResponse && rawResponse.length ? rawResponse[0].total_count : 0;

  return (
    <>
      <HeaderBox
        isRound={rounded}
        title={`${title} (${size})`}
        isExpand={expandState}
        expandToggle={expandHandler.toggle}
        isExpandable={size > 0}
      />
      <div
        className={twMerge(
          'hidden h-0 ease-in-out',
          expandState && 'block h-auto',
        )}
      >
        {flattenData.map((item) => (
          <Link key={item.id} href={`/app/projects/${item.id}`} passHref>
            <a>
              <ProjectItem
                title={item.title}
                border
                applicants={item.applicants}
                date={dayjs(item?.updated_at)?.format('MMM D')}
              />
            </a>
          </Link>
        ))}
        {seeMore && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="font-semibold text-primary"
              onClick={loadMore}
            >
              See more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsByStatus;
