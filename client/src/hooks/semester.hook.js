import {
  getAllSemesterDates,
  setSemesterDates,
  toggleSemesterStatus,
} from '@/api/semester.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries
export function useGetSemesterDates(activeSchoolYearId) {
  return useQuery({
    queryKey: ['list-of-semester', activeSchoolYearId],
    queryFn: () => getAllSemesterDates(),
    select: ({ data }) => {
      return data;
    },
    enabled: !!activeSchoolYearId,
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

export function useSemesterToggleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSemesterStatus,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-semester'] });
      ToastNotification('success', data);
    },
  });
}
