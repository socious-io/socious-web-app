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
  console.log('LLLLLLL');
  console.log(identities);
  const router = useRouter();

  // useEffect(() => {
  //   console.log(router);
  //   const l = router.push('/app/projects');
  //   console.log('GGGGGGG');
  //   console.log(l);

  //   if (identities) router.push('/app/projects');
  // });

  // if (identities === null) {
  //   return (
  //     <PreAuthLayout>
  //       <StartScreen />
  //     </PreAuthLayout>
  //   );
  // }

  // return (
  //   <PreAuthLayout>
  //     <SplashScreen />
  //   </PreAuthLayout>
  // );
  return (
    <button
      onClick={() => {
        console.log('!!!!!');
        const m = router.push('/payment');
        console.log(m);
        alert('$');

        router.push('/payment');
      }}
      className="flex h-full w-full items-center justify-center bg-slate-600"
    >
      MOZHDE
    </button>
  );
};

export default HomePage;
