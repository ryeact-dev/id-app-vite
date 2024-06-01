import {
  getPaginatedPrintedIdsReport,
  getPaginatedValidatedIdsReport,
} from '@/api/reports.api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Queries
export function useGetPaginatedPrintedIdsReport(date, page, limit) {
  const forQueryingData = { ...date, page, limit };

  return useQuery({
    queryKey: ['reports-list-of-printed-ids', page, limit, date],
    queryFn: () =>
      getPaginatedPrintedIdsReport({
        forQueryingData,
      }),
    placeholderData: keepPreviousData,
    select: ({ data }) => {
      return data;
    },
  });
}

export function useGetPaginatedValidatedIdsReport(date, page, limit) {
  const forQueryingData = { ...date, page, limit };

  return useQuery({
    queryKey: ['reports-list-of-validated-ids', page, limit, date],
    queryFn: () =>
      getPaginatedValidatedIdsReport({
        forQueryingData,
      }),
    placeholderData: keepPreviousData,
    select: ({ data }) => {
      return data;
    },
  });
}
