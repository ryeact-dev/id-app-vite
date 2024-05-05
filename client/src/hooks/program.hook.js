import { addProgram, deleteProgram, getAllPrograms } from '@/api/program.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries
export function useGetAllPrograms() {
  return useQuery({
    queryKey: ['all-programs'],
    queryFn: () => getAllPrograms(),
    select: ({ data }) => {
      return data.map((program) => {
        return {
          ...program,
          department: program.department?.department,
        };
      });
    },
  });
}

// Mutations
export function useAddProgram(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProgram,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-programs'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useDeleteProgram(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProgram,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-programs'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}
