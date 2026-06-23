import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { setCredentials, logout as logoutAction } from '@features/auth/authSlice';
import { authApi } from '@features/auth/authApi';
import { handleApiError } from '@utils/errorHandler';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async data => {
      dispatch(setCredentials(data));
      await Keychain.setGenericPassword('auth', JSON.stringify(data));
      Toast.show({ type: 'success', text1: 'Welcome back!', text2: data.user.name });
    },
    onError: handleApiError,
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: async data => {
      dispatch(setCredentials(data));
      await Keychain.setGenericPassword('auth', JSON.stringify(data));
      Toast.show({ type: 'success', text1: 'Account created!', text2: data.user.name });
    },
    onError: handleApiError,
  });

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      await Keychain.resetGenericPassword();
      dispatch(logoutAction());
      Toast.show({ type: 'info', text1: 'Logged out' });
    }
  }, [dispatch]);

  return {
    ...auth,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
};
