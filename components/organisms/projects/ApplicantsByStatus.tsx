import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {useToggle} from '@hooks';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import dayjs from 'dayjs';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import Link from 'next/link';
import {FC} from 'react';
import {twMerge} from 'tailwind-merge';
import HeaderBox from '../../common/Project/component/HeaderBox';

type ApplicantsByStatusProps = {
  status: TApplicantStatus;
  projectId: string;
  title: string;
  rounded?: boolean;
};

const ApplicantsByStatus: FC<ApplicantsByStatusProps> = ({
  status,
  projectId,
  title,
  rounded = true,
}) => {
  const {state: expandState, handlers: expandHandler} = useToggle();

  const {flattenData, loadMore, seeMore} = useInfiniteSWR<TApplicant>(
    projectId && status
      ? `/projects/${projectId}/applicants?status=${status}`
      : null,
  );

  return (
    <>
      <HeaderBox
        isRound={rounded}
        title={`${title} (${flattenData.length})`}
        isExpand={expandState}
        expandToggle={expandHandler.toggle}
        isExpandable={!!flattenData?.length}
      />
      <div
        className={twMerge(
          'hidden h-0 ease-in-out',
          expandState && 'block h-auto',
        )}
      >
        {flattenData.map((applicant) => (
          <Link
            key={applicant.id}
            href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
          >
            <a>
              <CardBoxComplete
                name={applicant?.user?.name}
                username={applicant?.user?.username ?? ''}
                applicationDate={dayjs(applicant?.created_at)?.format('MMM D')}
                message={
                  applicant.cover_letter
                    ? applicant.cover_letter.length > 50
                      ? `${applicant.cover_letter?.slice(0, 50)}...}`
                      : applicant.cover_letter
                    : 'No message'
                }
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

export default ApplicantsByStatus;
