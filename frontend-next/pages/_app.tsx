import '../asset/css/global.css';
import '../styles/index.css';
import '../styles/App.css';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WalletProvider } from '../context/useWalletContext';
import Layout from 'layout/Wrapper/Wrapper';

function getLibrary(provider: any) {
    return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Layout>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Component {...pageProps} />
                </Web3ReactProvider>
            </Layout>
        </>
    );
}

export default MyApp;
