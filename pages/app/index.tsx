import {NextPage} from 'next';
import React, {useEffect} from 'react';
import SideBar from '@components/common/Feed/SideBar';
import MainContent from '@components/common/Feed/MainContent';
import StartScreen from '@components/common/StartScreen/StartScreen';
import useUser from 'hooks/useUser/useUser';
import SplashScreen from 'layout/Splash';
import {GeneralLayout, PreAuthLayout, DetailLayout} from '../../layout';
import Router from 'next/router';
const HomePage: NextPage = () => {
  const {identities, identitiesError} = useUser({redirect: false});

  useEffect(() => {
    if (identities) Router.push('/app/projects');
  });

  if (identities === null) {
    return (
      <PreAuthLayout>
        <StartScreen />
      </PreAuthLayout>
    );
  }

  return (
    <PreAuthLayout>
      <SplashScreen />
    </PreAuthLayout>
  );
};

export default HomePage;
