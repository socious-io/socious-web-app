import {NextPage} from 'next';
import React from 'react';
import SideBar from '@components/common/Notification/Sidebar';
import NotificationContainer from '@components/common/Notification/NotificationContainer';
import StartScreen from '@components/common/StartScreen/StartScreen';
import useUser from 'hooks/useUser/useUser';
import SplashScreen from 'layout/Splash';
import {GeneralLayout} from 'layout';
const Index: NextPage = () => {
  const {user, userError} = useUser();

  if (!userError && !user) {
    return <SplashScreen />;
  }

  if (userError?.response?.status === 401) {
    return <StartScreen />;
  }

  return (
    <GeneralLayout>
      <div className="mt-10 flex w-full sm:mt-0 lg:space-x-6">
        <SideBar />
        <NotificationContainer />
      </div>
    </GeneralLayout>
  );
};

export default Index;
