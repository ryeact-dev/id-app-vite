import {
  addUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  loginUser,
  logoutUser,
  toggleUserStatus,
  updateUserPassword,
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

export function useGetAllUsers(currentUser, fullName, page, limit) {
  return useQuery({
    queryKey: ['all-users', fullName, page, limit],
    queryFn: () => getAllUsers({ fullName, page, limit }),
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
      navigate('/', { replace: true });
    },
  });
}

// LOGOUT USER
export function useLogoutUser(closeModal) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      navigate('/login', { replace: true });
      closeModal();
    },
  });
}

export function useUpdateUserPassword(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPassword,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      ToastNotification('success', 'Password updated successfully');
      closeModal();
    },
  });
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserStatus,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      ToastNotification('success', data);
    },
  });
}

export function useDeleteUser(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}
