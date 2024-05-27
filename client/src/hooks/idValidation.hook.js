import {
  addValidatedID,
  getPaginatedValidations,
} from '@/api/id_validation.api';
import { deletePrintTransaction, releaseID } from '@/api/printing.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Queries
export function useGetPaginatedValidations(searchQuery, page, limit) {
  return useQuery({
    queryKey: ['list-of-validated-ids', searchQuery, page, limit],
    placeholderData: keepPreviousData,
    queryFn: () => getPaginatedValidations({ searchQuery, page, limit }),
    select: ({ data }) => {
      return data;
    },
  });
}

// Mutations
export function useValidateID(setIDBarcode) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addValidatedID,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-validated-ids'] });
      ToastNotification(
        'success',
        `${data.studentIdNumber}'s ID Validated successfully`
      );
      setIDBarcode('');
      return data;
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
