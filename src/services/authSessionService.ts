import { queryClient } from '@api/queryClient';
import { logout } from '@features/auth/authSlice';
import { store, persistor } from '@store/index';
import { authStorage } from '@/services/authStorage';

export type ClearSessionOptions = {
  skipQueryCache?: boolean;
};

/**
 * Single entry point for ending a user session.
 * Clears secure storage, Redux auth state, persisted snapshot, and client caches.
 */
export const clearAuthSession = async (options?: ClearSessionOptions): Promise<void> => {
  await authStorage.clearSession();
  store.dispatch(logout());

  if (!options?.skipQueryCache) {
    queryClient.clear();
  }

  await persistor.flush();
};
