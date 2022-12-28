import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import {useToggle} from '@hooks';
import {Avatar, Chip} from '@components/common';
import {IOffer, TOfferStatus} from '@models/offer';
import dayjs from 'dayjs';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import Link from 'next/link';
import {FC, useCallback, useMemo} from 'react';
import {twMerge} from 'tailwind-merge';
import HeaderBox from '../../common/Project/component/HeaderBox';

type OffersByStatusProps = {
  status: TOfferStatus | TOfferStatus[];
  projectId: string;
  title: string;
  goTo?: 'HIRED';
  rounded?: boolean;
};

const OffersByStatus: FC<OffersByStatusProps> = ({
  status,
  projectId,
  title,
  goTo,
  rounded = true,
}) => {
  const {state: expandState, handlers: expandHandler} = useToggle();

  const {flattenData, loadMore, seeMore, rawResponse} = useInfiniteSWR<IOffer>(
    projectId && status
      ? `/projects/${projectId}/offers?filter.status=${
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
        {flattenData.map((offer) => (
          <Link
            key={offer.id}
            href={`/app/projects/created/${offer.project_id}/offered/${offer.id}`}
          >
            <a>
              <div className="border border-b-grayLineBased  bg-white p-4">
                <div className="flex flex-row items-center justify-between ">
                  <div className="flex flex-row items-center  space-x-2">
                    <Avatar size="l" src={offer.recipient.meta?.avatar} />
                    <div>
                      <p className="text-black">{offer.recipient.meta?.name}</p>
                      <Link
                        href={`/app/user/${offer.recipient.meta?.username}`}
                      >
                        <p className="cursor-pointer text-primary">
                          View profile
                        </p>
                      </Link>
                      <Link
                        href={`/app/projects/created/${offer.project_id}/applicants/${offer.applicant_id}`}
                      >
                        <p className="cursor-pointer text-primary">
                          View application
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between ">
                  <p className="my-4 text-sm">
                    <b>Offer date: </b>
                    {dayjs(offer?.created_at)?.format('MMM D')}
                  </p>
                  <p className="my-4 text-sm">
                    <b>Total hours: </b>
                    {offer.total_hours} H
                  </p>
                  <p className="my-4 text-sm">
                    <b>Payment type: </b>
                    {offer.project.payment_type}
                  </p>
                </div>
              </div>
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

export default OffersByStatus;
