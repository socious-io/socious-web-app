import React from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import {ChevronLeftIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
import EscrowApplication from '@components/organisms/projects/EscrowApplication';

const EscrowPaymentPage: NextPage = () => {
  const router = useRouter();
  const {projectId, oid} = router.query;

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
      <EscrowApplication />
    </GeneralLayout>
  );
};

export default EscrowPaymentPage;
