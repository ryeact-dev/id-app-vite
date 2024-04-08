import { useGetCurrentUserData } from '@/hooks/users';
import { LuAlertTriangle } from 'react-icons/lu';
import { Navigate, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const { currentUser } = useGetCurrentUserData();
  const error = useRouteError();

  if (currentUser === null) return <Navigate to='/login' replace={true} />;
  // RENDER SECTION
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full h-full'>
      <div className='flex items-center justify-center gap-2'>
        <LuAlertTriangle size={24} className='text-secondary' />
        <h2 className='font-medium text-xl text-secondary'>Server 500 Error</h2>
      </div>
      <p className='my-2 font-medium'>{error.message}</p>
      <p>
        Go back to{' '}
        <a
          href='/app/lab-scheduler'
          className='font-medium tracking-wide text-green'
        >
          Laboratory Schedule
        </a>
      </p>
    </div>
  );
}
