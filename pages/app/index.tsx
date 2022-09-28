import {NextPage} from 'next';
import React from 'react';
import SideBar from '@components/common/Home/SideBar';
import MainContent from '@components/common/Home/MainContent';
import StartScreen from '@components/common/StartScreen/StartScreen';
import useUser from 'hooks/useUser/useUser';
import IdealScreen from 'layout/IdealScreen/IdealScreen';
import {GeneralLayout, PreAuthLayout, DetailLayout} from '../../layout';
const HomePage: NextPage = () => {
  const {identities, identitiesError} = useUser({redirect: false});

  if (identities === null) {
    return (
      <PreAuthLayout>
        <StartScreen />
      </PreAuthLayout>
    );
  }

  if (!identitiesError && !identities) {
    return (
      <PreAuthLayout>
        <IdealScreen />
      </PreAuthLayout>
    );
  }

  return (
    <GeneralLayout hasNavbar>
      <SideBar />
      <DetailLayout>
        <MainContent />
      </DetailLayout>
    </GeneralLayout>
  );
};

export default HomePage;
