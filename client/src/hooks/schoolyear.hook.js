import { deleteDepartment } from '@/api/department.api';
import {
  addSchoolYear,
  getAllSchoolYear,
  schoolYearToggleStatus,
} from '@/api/schoolyear.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries
export function useGetListOfSchoolYear() {
  return useQuery({
    queryKey: ['list-of-school-year'],
    queryFn: () => getAllSchoolYear(),
    select: ({ data }) => {
      return data;
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
      queryClient.invalidateQueries({ queryKey: ['list-of-school-year'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

export function useSchoolYearToggleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schoolYearToggleStatus,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-school-year'] });
      ToastNotification('success', data);
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
