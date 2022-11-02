import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {useToggle} from '@hooks';
import {TApplicant, TApplicantStatus} from '@models/applicant';
import dayjs from 'dayjs';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import Link from 'next/link';
import {FC, useMemo} from 'react';
import {twMerge} from 'tailwind-merge';
import HeaderBox from '../../common/Project/component/HeaderBox';

type ApplicantsByStatusProps = {
  status: TApplicantStatus | TApplicantStatus[] | 'MISSION';
  projectId: string;
  title: string;
  goTo?: 'HIRED';
  rounded?: boolean;
};

const ApplicantsByStatus: FC<ApplicantsByStatusProps> = ({
  status,
  projectId,
  title,
  goTo,
  rounded = true,
}) => {
  const {state: expandState, handlers: expandHandler} = useToggle();

  const {flattenData, loadMore, seeMore, rawResponse} =
    useInfiniteSWR<TApplicant>(
      projectId && status
        ? `/projects/${projectId}/applicants?status=${
            typeof status === 'string' ? status : status.join(',')
          }`
        : null,
    );

  const size = useMemo(
    () => (rawResponse && rawResponse.length ? rawResponse[0].total_count : 0),
    [rawResponse],
  );

  return (
    <>
      <HeaderBox
        isRound={rounded}
        title={`${title} (${size})`}
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
            href={`/app/projects/created/${applicant.project_id}/${
              goTo === 'HIRED' ? 'hired' : 'applicants'
            }/${applicant.id}`}
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
