import {
  addDepartment,
  deleteDepartment,
  getAllDepartments,
} from '@/api/department.api';
import { addSchoolYear } from '@/api/schoolyear.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries
export function useGetAllDepartments() {
  return useQuery({
    queryKey: ['all-departments'],
    queryFn: () => getAllDepartments(),
    select: ({ data }) => {
      return data.map((department) => {
        return {
          ...department,
          value: department.id,
          label: department.department,
        };
      });
    },
  });
}

// Mutations
export function useAddSchoolyear(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSchoolYear,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-schoolyear'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useDeleteDepartment(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['all-departments'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}
