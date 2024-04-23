import { addUser, getCurrentUser, loginUser } from '@/api/user.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Queries
export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(),
    select: ({ data }) => {
      return data;
    },
  });
}

// Mutations
export function useAddUser(closeModal) {
  return useMutation({
    mutationFn: addUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useLoginUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      navigate('/dashboard', { replace: true });
    },
  });
}
