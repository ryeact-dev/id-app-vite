import { addEditStudent } from '@/api/student.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Queries
// export function useGetSemesterDates(activeSchoolYearId) {
//   return useQuery({
//     queryKey: ['list-of-semester', activeSchoolYearId],
//     queryFn: () => getAllSemesterDates(),
//     select: ({ data }) => {
//       return data;
//     },
//     enabled: !!activeSchoolYearId,
//   });
// }

// Mutations
export function useAddStudent(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEditStudent,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-students'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

// export function useSemesterToggleStatus() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: toggleSemesterStatus,
//     onError: ({ response }) => ToastNotification('error', response.data),
//     onSuccess: ({ data }) => {
//       queryClient.invalidateQueries({ queryKey: ['list-of-semester'] });
//       ToastNotification('success', data);
//     },
//   });
// }
