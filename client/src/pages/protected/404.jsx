import { useEffect } from 'react';
import { headerStore } from '@/store';
import { LuFrown } from 'react-icons/lu';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Not Authorize' });
  }, []);

  return (
    <div className='hero h-4/5 bg-base-200'>
      <div className='hero-content text-center text-accent'>
        <div className='max-w-md'>
          <LuFrown className='inline-block h-48 w-48' />
          <h1 className='text-5xl  font-bold'>404 - Not Found</h1>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
