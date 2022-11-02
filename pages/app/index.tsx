import {NextPage} from 'next';
import React, {useEffect} from 'react';
import SideBar from '@components/common/Feed/SideBar';
import MainContent from '@components/common/Feed/MainContent';
import StartScreen from '@components/common/StartScreen/StartScreen';
import useUser from 'hooks/useUser/useUser';
import SplashScreen from 'layout/Splash';
import {GeneralLayout, PreAuthLayout, DetailLayout} from '../../layout';
import {useRouter} from 'next/router';
const HomePage: NextPage = () => {
  const {identities, identitiesError} = useUser({redirect: false});
  const router = useRouter();

  useEffect(() => {
    console.log(router);
    const l = router.push('/app/projects');
    console.log('GGGGGGG');
    console.log(l);

    if (identities) router.push('/app/projects');
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
