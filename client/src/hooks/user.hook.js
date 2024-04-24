import {
  addUser,
  getAllUsers,
  getCurrentUser,
  loginUser,
} from '@/api/user.api';
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

export function useGetAllUsers(currentUser) {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: () => getAllUsers(),
    select: ({ data }) => {
      return data;
    },
    enabled: !!currentUser,
  });
}

// Mutations
export function useAddUser(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
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
