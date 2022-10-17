import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {useToggle} from '@hooks';
import {
  TApplicant,
  TApplicantsByStatus,
  TApplicantsResponse,
} from '@models/applicant';
import dayjs from 'dayjs';
import Link from 'next/link';
import {useMemo} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

import HeaderBox from '../component/HeaderBox';

type ApplicantsContentProps = {
  projectId: string;
};

function ApplicantsContent({projectId}: ApplicantsContentProps) {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showSaved, handlers: showSavedHandler} = useToggle();
  const {state: showDeclined, handlers: showDeclinedHandler} = useToggle();

  const {data: applicantsData, error: applicantsError} =
    useSWR<TApplicantsResponse>(
      projectId ? `/projects/${projectId}/applicants` : null,
      get,
    );

  const flattenApplicantsObj: TApplicantsByStatus = useMemo(() => {
    const flattenApplicants = applicantsData?.items ?? [];

    return flattenApplicants?.reduce(
      (obj: TApplicantsByStatus, currentValue: TApplicant) => {
        if (obj) {
          if (!obj[currentValue['status'] ?? 'ERROR']) {
            obj[currentValue['status'] ?? 'ERROR'] = [];
          }
          obj[currentValue['status'] ?? 'ERROR'].push(currentValue);
        }
        return obj;
      },
      {
        PENDING: [],
        REJECTED: [],
        OFFERED: [],
        APPROVED: [],
        HIRED: [],
        WITHRAWN: [],
      },
    );
  }, [applicantsData]);

  return (
    <div className="py-4">
      <div className="my-4 rounded-2xl border border-grayLineBased bg-white ">
        <HeaderBox
          title={`to review (${flattenApplicantsObj?.['PENDING']?.length})`}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={true}
          isRound={true}
        />
        {showOnGoing &&
          flattenApplicantsObj?.['PENDING'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM D',
                  )}
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

        <HeaderBox
          isRound={false}
          title={`saved (${flattenApplicantsObj?.['OFFERED']?.length})`}
          isExpand={showSaved}
          expandToggle={showSavedHandler.toggle}
          isExpandable={true}
        />
        {showSaved &&
          flattenApplicantsObj?.['OFFERED'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM D',
                  )}
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
        <HeaderBox
          isRound={false}
          title={`Declined (${flattenApplicantsObj?.['REJECTED']?.length})`}
          isExpand={showDeclined}
          expandToggle={showDeclinedHandler.toggle}
          isExpandable={true}
        />
        {showDeclined &&
          flattenApplicantsObj?.['REJECTED'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM D',
                  )}
                  message={
                    applicant.cover_letter
                      ? applicant.cover_letter?.length > 50
                        ? `${applicant.cover_letter?.slice(0, 50)}...}`
                        : applicant.cover_letter
                      : 'No message'
                  }
                />
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default ApplicantsContent;
