import { useQuery } from '@tanstack/react-query';
import { ProfileParams } from '@/api/profile';
import { getProfile } from '@/api/profile';
export const useProfile = (params: ProfileParams) => {
  return useQuery({
    queryKey: ['profile', params.launch],
    queryFn: () => getProfile(params),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
