'use client';

import Head from 'next/head';
import * as React from 'react';

import Home from '@/components/home';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Alora designer stiching center</title>
      </Head>
      <Home />
    </main>
  );
}
