import {NextPage} from 'next';
import React from 'react';
import SideBar from '@components/common/Notification/Sidebar';
import NotificationContainer from '@components/common/Notification/NotificationContainer';
import StartScreen from '@components/common/StartScreen/StartScreen';
import useUser from 'hooks/useUser/useUser';
import IdealScreen from 'layout/IdealScreen/IdealScreen';

const Index: NextPage = () => {
  const {user, userError} = useUser();

  if (!userError && !user) {
    return <IdealScreen />;
  }

  if (userError?.response?.status === 401) {
    return <StartScreen />;
  }

  return (
    <div className="flex mt-10 lg:space-x-6">
      <SideBar />
      <NotificationContainer />
    </div>
  );
};

export default Index;
