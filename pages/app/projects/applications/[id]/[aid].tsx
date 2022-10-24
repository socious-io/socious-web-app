/*
 * Individual application page for user_type="user"
 */
import {useRouter} from 'next/router';
import {GridLoader} from 'react-spinners';
import {useEffect} from 'react';

// Icons
import {ChevronLeftIcon} from '@heroicons/react/24/solid';

// hooks
import {useUser, useApplication} from '@hooks';

// Components
import MyApplication from '@components/common/Applications/MyApplications/MyApplication';
import SideBar from '@components/common/SimpleSideBar/Sidebar';
import {GeneralLayout} from 'layout';

const Applicant = () => {
  const router = useRouter();
  const {id, aid} = router.query;
  const {currentIdentity} = useUser();

  // Go back if it is ORG.
  useEffect(() => {
    if (currentIdentity?.type === 'organizations') router.back();
  }, [currentIdentity, router]);

  const {data, error, mutate, isLoading} = useApplication(
    aid ? (aid as string) : null,
  );

  if (isLoading)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  if (!data) return <div>ERROR</div>;

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
        <MyApplication applicant={data} mutateApplication={mutate} />
      </div>
    </GeneralLayout>
  );
};

export default Applicant;
