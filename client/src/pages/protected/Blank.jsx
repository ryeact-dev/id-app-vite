import { LuFile } from 'react-icons/lu';

function InternalPage() {
  return (
    <div className='hero h-4/5 bg-base-200'>
      <div className='hero-content text-center text-accent'>
        <div className='max-w-md'>
          <LuFile className='inline-block h-48 w-48' />
          <h1 className='mt-2 text-5xl font-bold'>Blank Page</h1>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;