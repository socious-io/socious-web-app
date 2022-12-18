import {NextPage} from 'next';
import Link from 'next/link';
import Router from 'next/router';
import React, {useEffect} from 'react';

const Index: NextPage = () => {
  useEffect(() => {
    Router.push('/app');
    // Router.push('/app/auth/login');
  });
  return <Link href="/app">Check /app</Link>;
};

export default Index;
