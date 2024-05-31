import {
  addUpdatePrintId,
  deletePrintTransaction,
  getPaginatedPrintedIds,
  releaseID,
} from '@/api/printing.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Queries
export function useGetPaginatedPrintedIds(
  schoolYearId,
  semesterId,
  searchQuery,
  page,
  limit
) {
  return useQuery({
    queryKey: [
      'list-of-printed-ids',
      schoolYearId,
      semesterId,
      searchQuery,
      page,
      limit,
    ],
    placeholderData: keepPreviousData,
    queryFn: () =>
      getPaginatedPrintedIds({
        schoolYearId,
        semesterId,
        searchQuery,
        page,
        limit,
      }),
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
      closeModal();
    },
  });
}

export function useReleaseId(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: releaseID,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-of-printed-ids'] });
      ToastNotification('success', 'ID Released');
      closeModal();
    },
  });
}

export function useDeletePrintTransaction(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePrintTransaction,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-of-printed-ids'] });
      ToastNotification('success', 'Transaction successfully deleted');
      closeModal();
    },
  });
}
