import {SWRConfig} from 'swr';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {get} from 'utils/request';
import '../asset/css/global.css';
import '../styles/index.css';
import '../styles/bottom-sheet.css';
import '../styles/App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Socious</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SWRConfig
        value={{
          fetcher: get,
          onError: (error) => {
            if (
              error?.response?.status === 400 ||
              (500 &&
                error?.response?.data?.error?.startsWith(
                  'invalid input syntax for type uuid',
                ))
            )
              return toast.error(error?.response?.data?.message);
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
      <ToastContainer />
    </>
  );
}

export default MyApp;
