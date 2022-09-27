// import {Web3ReactProvider} from '@web3-react/core';
// import Web3 from 'web3';
import {SWRConfig} from 'swr';

import type {AppProps} from 'next/app';
import Head from 'next/head';
import {WalletProvider} from '../context/useWalletContext';
import {get} from 'utils/request';
import PushNotification from '@components/common/PushNotification/PushNotification';
import '../asset/css/global.css';
import '../styles/index.css';
import '../styles/App.css';

// function getLibrary(provider: any) {
//   return new Web3(provider);
// }

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: get,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <PushNotification>
        <Component {...pageProps} />
      </PushNotification>
    </SWRConfig>
  );
}

export default MyApp;
