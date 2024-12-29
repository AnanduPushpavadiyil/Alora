'use client'; // Ensure this is at the top for client-side rendering

// import { useState } from 'react';

import Wrapper from '@/app/components/admin/common/wrapper';
// import Loader from '@/app/components/Loader';

const EntryPage: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      {/* {loading && <Loader />} */}
      <Wrapper>
        <div>entry</div>
      </Wrapper>
    </div>
  );
};

export default EntryPage;
