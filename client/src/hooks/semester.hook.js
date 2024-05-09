import {
  addSchoolYear,
  deleteSchoolYear,
  getAllSchoolYear,
  schoolYearToggleStatus,
} from '@/api/schoolyear.api';
import { getAllSemesterDates, setSemesterDates } from '@/api/semester.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries
export function useGetSemesterDates(schoolYearId) {
  return useQuery({
    queryKey: ['list-of-semester'],
    queryFn: () => getAllSemesterDates({ schoolYearId }),
    select: ({ data }) => {
      return data;
    },
  });
}

// Mutations
export function useSetSemesterDates(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setSemesterDates,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-semester'] });
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

export function useDeleteSchoolYear(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchoolYear,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-school-year'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}
