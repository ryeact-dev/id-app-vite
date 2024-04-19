import { addUser } from '@/api/user.api';
import { useMutation } from '@tanstack/react-query';

export function useAddUser(closeModal) {
  return useMutation({
    mutationFn: addUser,
    onError: ({ response }) => {
      console.log(response.data);
    },
    onSuccess: ({ data }) => {
      console.log(data);
      closeModal();
    },
  });
}
