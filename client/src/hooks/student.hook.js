import { addEditStudent, getPaginatedStudents } from '@/api/student.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Queries
export function useGetPaginatedStudents(searchQuery, page, limit) {
  return useQuery({
    queryKey: ['list-of-students', searchQuery, limit, page],
    placeholderData: keepPreviousData,
    queryFn: () => getPaginatedStudents({ searchQuery, limit, page }),
    select: ({ data }) => {
      return data;
    },
  });
}

// Mutations
export function useAddStudent(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEditStudent,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-students'] });
      queryClient.invalidateQueries({ queryKey: ['list-of-printed-ids'] });
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
