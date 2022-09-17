import {NextPage} from 'next';
import React from 'react';
import SideBar from '@components/common/Home/SideBar';
import MainContent from '@components/common/Home/MainContent';
import StartScreen from '@components/common/StartScreen/StartScreen';
import useUser from 'hooks/useUser/useUser';
import IdealScreen from 'layout/IdealScreen/IdealScreen';

const Index: NextPage = () => {
  const {identities, identitiesError} = useUser({redirect: false});

  if (identities === null) {
    return <StartScreen />;
  }

  if (!identitiesError && !identities) {
    return <IdealScreen />;
  }

  return (
    <div className="flex mt-10 space-x-6">
      <SideBar />
      <MainContent />
    </div>
  );
};

export default Index;
