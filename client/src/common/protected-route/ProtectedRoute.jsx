import { useCurrentUser } from '@/hooks/user.hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  return children;
}
