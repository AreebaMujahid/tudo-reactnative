import { QueryClient } from '@tanstack/react-query';
import { handleApiError } from '@utils/errorHandler';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      onError: handleApiError,
    },
  },
});
