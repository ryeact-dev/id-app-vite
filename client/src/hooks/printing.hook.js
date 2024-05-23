import { addUpdatePrintId, getPaginatedPrintedIds } from '@/api/printing.api';
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
    queryKey: ['list-of-printed-ids', searchQuery, page, limit],
    placeholderData: keepPreviousData,
    queryFn: () => getPaginatedPrintedIds({ searchQuery, page, limit }),
    select: ({ data }) => {
      return data;
    },
  });
}

// Mutations
export function usePrintId(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUpdatePrintId,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-of-printed-ids'] });
      ToastNotification('success', 'ID sent to printer');
      // closeModal();
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
