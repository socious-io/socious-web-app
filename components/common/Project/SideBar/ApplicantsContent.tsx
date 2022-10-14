import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import TextBoxGray from '@components/common/TextBoxGray/TextBoxGray';
import TitleViewBoxWithCard from '@components/common/TitleViewBoxWithAvatar/TitleViewBoxWithAvatar';
import TwoCloumnTwoRowBox from '@components/common/TwoColumnTwoRow/TwoColumnTwoRow';
import {useToggle, useUser} from '@hooks';
import {TApplicant, TApplicantsResponse} from '@models/applicant';
import dayjs from 'dayjs';
import Link from 'next/link';
import {useMemo} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

import HeaderBox from '../component/HeaderBox';

var data = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
];
var data2 = [
  {
    id: 1,
    projectId: '1',
  },
];

type ApplicantsContentProps = {
  projectId: string;
};

function ApplicantsContent({projectId}: ApplicantsContentProps) {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showSaved, handlers: showSavedHandler} = useToggle();
  const {state: showDeclined, handlers: showDeclinedHandler} = useToggle();
  const {user} = useUser();

  const {data: applicantsData, error: applicantsError} =
    useSWR<TApplicantsResponse>(
      projectId ? `/projects/${projectId}/applicants` : null,
      get,
    );

  const flattenApplicantsObj: {
    PENDING: TApplicant[];
    DECLINED: TApplicant[];
    SAVED: TApplicant[];
  } = useMemo(() => {
    const flattenApplicants = applicantsData?.items ?? [];

    return flattenApplicants?.reduce(
      (obj, currentValue) => {
        if (!obj[currentValue['status'] ?? 'ERROR']) {
          obj[currentValue['status'] ?? 'ERROR'] = [];
        }
        obj[currentValue['status'] ?? 'ERROR'].push(currentValue);
        return obj;
      },
      {
        PENDING: [],
        DECLINED: [],
        SAVED: [],
      },
    );
  }, [applicantsData]);

  console.log('FLATTEN applicants', flattenApplicantsObj);

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
                    'MMM d',
                  )}
                  key={applicant.id}
                  message={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                  }
                />
              </a>
            </Link>
          ))}

        <HeaderBox
          isRound={false}
          title={`saved (${flattenApplicantsObj?.['SAVED']?.length})`}
          isExpand={showSaved}
          expandToggle={showSavedHandler.toggle}
          isExpandable={true}
        />
        {showSaved &&
          flattenApplicantsObj?.['SAVED'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM d',
                  )}
                  message={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                  }
                />
              </a>
            </Link>
          ))}
        <HeaderBox
          isRound={false}
          title={`saved (${flattenApplicantsObj?.['DECLINED']?.length})`}
          isExpand={showDeclined}
          expandToggle={showDeclinedHandler.toggle}
          isExpandable={true}
        />
        {showDeclined &&
          flattenApplicantsObj?.['DECLINED'].map((applicant) => (
            <Link
              key={applicant.id}
              href={`/app/projects/created/${applicant.project_id}/applicants/${applicant.id}`}
            >
              <a>
                <CardBoxComplete
                  name={applicant?.user?.name}
                  username={applicant?.user?.username ?? ''}
                  applicationDate={dayjs(applicant?.created_at)?.format(
                    'MMM d',
                  )}
                  key={applicant.id}
                  message={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
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
