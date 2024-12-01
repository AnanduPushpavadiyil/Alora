'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';

import Wrapper from '@/app/components/customer/common/wrapper';
import Home from '@/app/components/customer/home';
import Loader from '@/app/components/Loader';

export default function HomePage() {
  const [loader, setLoader] = useState<boolean>();
  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);
  return (
    <main>
      {loader && <Loader />}
      <Head>
        <title>Alora designer stiching center</title>
      </Head>
      <Wrapper>
        <Home />
      </Wrapper>
    </main>
  );
}
