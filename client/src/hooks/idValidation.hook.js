import {
  addValidatedID,
  getPaginatedValidations,
} from '@/api/id_validation.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Queries
export function useGetPaginatedValidations(
  schoolYearId,
  semesterId,
  searchQuery,
  page,
  limit
) {
  return useQuery({
    queryKey: [
      'list-of-validated-ids',
      schoolYearId,
      semesterId,
      searchQuery,
      page,
      limit,
    ],
    placeholderData: keepPreviousData,
    queryFn: () =>
      getPaginatedValidations({
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
export function useValidateID(setIDBarcode) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addValidatedID,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-validated-ids'] });
      queryClient.invalidateQueries({
        queryKey: ['reports-list-of-validated-ids'],
      });

      ToastNotification(
        'success',
        `${data.studentIdNumber}'s ID Validated successfully`
      );
      setIDBarcode('');
      return data;
    },
  });
}
