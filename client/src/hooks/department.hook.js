// Queries

import { addDepartment } from '@/api/department.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Mutations
export function useAddDepartment(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDepartment,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-departments'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}
