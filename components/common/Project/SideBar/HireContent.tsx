import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import TextBoxGray from '@components/common/TextBoxGray/TextBoxGray';
import TitleViewBoxWithCard from '@components/common/TitleViewBoxWithAvatar/TitleViewBoxWithAvatar';
import TwoCloumnTwoRowBox from '@components/common/TwoColumnTwoRow/TwoColumnTwoRow';
import {useToggle, useUser} from '@hooks';
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
import HiredCard from '../component/HiredCard';

type HireContentProps = {
  // hiredApplicants: TApplicant[];
  projectId: string;
};

function HiredContent({projectId}: HireContentProps) {
  const {state: showHired, handlers: showHiredHandler} = useToggle();
  const {state: showEndHired, handlers: showEndHiredHandler} = useToggle();

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
      <div className="my-4 rounded-2xl border border-grayLineBased bg-white">
        <HeaderBox
          title={`Hired (${flattenApplicantsObj['HIRED'].length})`}
          isExpand={showHired}
          expandToggle={showHiredHandler.toggle}
          isExpandable={true}
          isRound={true}
        />
        {showHired && (
          <div className="divide-y divide-grayLineBased">
            {flattenApplicantsObj?.['HIRED'].map((applicant) => (
              <Link
                key={applicant.id}
                href={`/app/projects/created/${applicant.project_id}/hired/${applicant.id}`}
              >
                <a>
                  <HiredCard
                    selected={false}
                    hasButtons={false}
                    name={applicant.user.name}
                    applicantId={applicant.id}
                    avatar={applicant.user.avatar}
                    username={applicant.user.username ?? ''}
                    paymentRate={applicant.payment_rate ?? undefined}
                    paymentType={applicant.payment_type ?? undefined}
                    endHire={() => console.log('ENDHIRE')}
                  />
                </a>
              </Link>
            ))}
          </div>
        )}

        <div className="w-full rounded-2xl border border-grayLineBased bg-white ">
          <HeaderBox
            isExpandable={true}
            isRound={false}
            // title={`End hire (${flattenApplicantsObj?.['ENDHIRE']?.length ?? 0})`}
            title={`End hire (0)`}
            isExpand={showEndHired}
            expandToggle={showEndHiredHandler.toggle}
          />
          {showEndHired &&
            [].map((applicant: TApplicant) => (
              <Link
                key={applicant?.id}
                href={`/app/projects/created/${applicant?.project_id}/hired/${applicant.id}`}
              >
                <a>
                  <HiredCard
                    selected={false}
                    hasButtons={false}
                    name={applicant.user.name}
                    applicantId={applicant.id}
                    avatar={applicant.user.avatar}
                    username={applicant.user.username ?? ''}
                    paymentRate={applicant.payment_rate ?? undefined}
                    paymentType={applicant.payment_type ?? undefined}
                    endHire={() => console.log('ENDHIRE')}
                  />
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HiredContent;
