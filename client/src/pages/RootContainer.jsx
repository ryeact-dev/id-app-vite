import { useGetCurrentUserData } from '@/hooks/users';
import { Navigate } from 'react-router-dom';

export default function RootContainer() {
  const { currentUser } = useGetCurrentUserData();

  if (currentUser === null) {
    return <Navigate to='/login' replace={true} />;
  } else return <Navigate to='/app/lab-scheduler' replace={true} />;
}
