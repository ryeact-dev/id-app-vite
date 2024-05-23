import { useCurrentUser } from '@/hooks/user.hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.userInfo === null) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  return children;
}
