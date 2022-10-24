/*
 * Individual application page for user_type="user"
 */

import SideBar from '@components/common/SimpleSideBar/Sidebar';
import {GeneralLayout} from 'layout';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/router';
import {useUser} from '@hooks';
import {useEffect} from 'react';
import MyApplication from '@components/common/Applications/MyApplications/MyApplication';
import useSWR from 'swr';
import {GridLoader} from 'react-spinners';
import {TApplicant} from '@models/applicant';
import {get} from 'utils/request';

const Applicant = () => {
  const router = useRouter();
  const {id, aid} = router.query;
  const {currentIdentity} = useUser();

  // Go back if it is ORG.
  useEffect(() => {
    if (currentIdentity?.type === 'organizations') router.back();
  }, [currentIdentity, router]);

  const {
    data: applicantData,
    error: applicantError,
    mutate: mutateApplicant,
  } = useSWR<TApplicant>(id && aid ? `/applicants/${aid}` : null, get);

  if (!applicantData && !applicantError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  if (!applicantData) return <div>ERROR</div>;

  return (
    <GeneralLayout hasNavbar>
      <div className="mx-6 flex w-full md:space-x-6">
        <SideBar
          title={
            <p className="flex gap-2">
              <ChevronLeftIcon className="w-5" />
              <span className="whitespace-nowrap">Back to my applications</span>
            </p>
          }
          url={`/app/projects/applications/${id}`}
        />
        <MyApplication applicant={applicantData} />
      </div>
    </GeneralLayout>
  );
};

export default Applicant;
