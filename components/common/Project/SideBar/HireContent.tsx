import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import TextBoxGray from '@components/common/TextBoxGray/TextBoxGray';
import TitleViewBoxWithCard from '@components/common/TitleViewBoxWithAvatar/TitleViewBoxWithAvatar';
import TwoCloumnTwoRowBox from '@components/common/TwoColumnTwoRow/TwoColumnTwoRow';
import {useToggle, useUser} from '@hooks';
import {TApplicant} from '@models/applicant';
import dayjs from 'dayjs';
import Link from 'next/link';

import HeaderBox from '../component/HeaderBox';
import HiredCard from '../component/HiredCard';

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

type HireContentProps = {
  hiredApplicants: TApplicant[];
};

function HiredContent({hiredApplicants}: HireContentProps) {
  const {state: showHired, handlers: showHiredHandler} = useToggle();

  return (
    <div className="w-full py-4">
      <div className=" rounded-2xl border border-grayLineBased ">
        <HeaderBox
          title={'Hired'}
          isExpand={showHired}
          expandToggle={showHiredHandler.toggle}
          isExpandable={false}
          isRound={false}
        />
        <TitleViewBoxWithCard />
        <TwoCloumnTwoRowBox />
        <HiredCard hasButtons={false} />

        <div className="w-full rounded-2xl border border-grayLineBased bg-white ">
          <HeaderBox
            isExpandable={true}
            isRound={false}
            title={`End hire (${hiredApplicants.length})`}
            isExpand={showHired}
            expandToggle={showHiredHandler.toggle}
          />
          {showHired &&
            hiredApplicants.map((applicant) => (
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
                      applicant.offer_message
                        ? applicant.offer_message.length > 200
                          ? `${applicant.offer_message?.slice(0, 50)}...}`
                          : applicant.offer_message
                        : 'No message'
                    }
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
