// src/app/public/login/page.tsx

'use client'; // Ensure this is at the top for client-side rendering

// import { useState } from 'react';

import Wrapper from '@/app/components/customer/common/wrapper';
import Login from '@/app/components/customer/Login';

const LoginPage: React.FC = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
};

export default LoginPage;
