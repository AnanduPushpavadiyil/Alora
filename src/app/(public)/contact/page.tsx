// src/app/public/login/page.tsx

'use client'; // Ensure this is at the top for client-side rendering

// import { useState } from 'react';

import Wrapper from '@/app/components/customer/common/wrapper';
import ContactUs from '@/app/components/customer/ContactUs';

const ContactUsPage: React.FC = () => {
  return (
    <Wrapper path='/contact'>
      <ContactUs />
    </Wrapper>
  );
};

export default ContactUsPage;
