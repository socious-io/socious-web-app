import React from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
import EscrowApplication from '@components/organisms/escrow/EscrowApplication';
import useSWR from 'swr';
import {get} from 'utils/request';
import {IOffer} from '@models/offer';

const EscrowPaymentPage: NextPage = () => {
  const router = useRouter();
  const {projectId, oid} = router.query;

  const {data: offer} = useSWR<IOffer>(`/offers/${oid}`, get);

  const loadEscrowApplication = offer ? (
    <EscrowApplication offer={offer} />
  ) : null;

  return (
    <GeneralLayout hasDetailNavbar detailNavbarTitle="Escrow payment">
      <div className="hidden w-80 md:flex" aria-label="Sidebar">
        <div className="w-full space-y-4 overflow-y-auto">
          <div
            onClick={() => router.back()}
            className="flex cursor-pointer flex-row rounded-2xl border border-grayLineBased bg-white px-2 py-4  "
          >
            <ChevronLeftIcon className=" w-6" />
            <span className="ml-2 w-full">
              <p className=" font-semibold ">Back</p>
            </span>
          </div>
        </div>
      </div>
      {loadEscrowApplication}
    </GeneralLayout>
  );
};

export default EscrowPaymentPage;
