import { addUser } from '@/api/user.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation } from '@tanstack/react-query';

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
