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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

// function getLibrary(provider: any) {
//   return new Web3(provider);
// }

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: get,
          onError: (error) => {
            if (
              error?.response?.status === 400 ||
              (500 &&
                error?.response?.data?.error.startsWith(
                  'invalid input syntax for type uuid',
                ))
            )
              return toast.error(error?.response?.data?.message);
          },
        }}
      >
        <PushNotification>
          <Component {...pageProps} />
        </PushNotification>
      </SWRConfig>
      <ToastContainer />
    </>
  );
}

export default MyApp;
