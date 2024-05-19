import { getPaginatedPrintedIds } from '@/api/printing.api';
import { addEditStudent, getPaginatedStudents } from '@/api/student.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Queries
export function useGetPaginatedPrintedIds(searchQuery, page, limit) {
  return useQuery({
    queryKey: ['list-of-printed-ids', searchQuery, limit, page],
    placeholderData: keepPreviousData,
    queryFn: () => getPaginatedPrintedIds({ searchQuery, limit, page }),
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
