import {
  getPaginatedPrintedIdsReport,
  getPaginatedValidatedIdsReport,
} from '@/api/reports.api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Queries
export function useGetPaginatedPrintedIdsReport(date, page, limit) {
  const forQueryingData = { ...date, page, limit };

  return useQuery({
    queryKey: ['list-of-printed-ids-report', page, limit, date],
    placeholderData: keepPreviousData,
    queryFn: () =>
      getPaginatedPrintedIdsReport({
        forQueryingData,
      }),
    select: ({ data }) => {
      return data;
    },
  });
}

export function useGetPaginatedValidatedIdsReport(date, page, limit) {
  const forQueryingData = { ...date, page, limit };

  return useQuery({
    queryKey: ['list-of-validated-ids-report', page, limit, date],
    placeholderData: keepPreviousData,
    queryFn: () =>
      getPaginatedValidatedIdsReport({
        forQueryingData,
      }),
    select: ({ data }) => {
      return data;
    },
  });
}
