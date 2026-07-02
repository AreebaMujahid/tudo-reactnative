import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { phoneRegistration, registerUser } from '../api/authApi';
import { verifyOtp, loginUser, resendOtp } from '../api/authApi';
import { RootState } from '@store/index';
import { clearAuthSession } from '@/services/authSessionService';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const logout = useCallback(async () => {
    await clearAuthSession();
  }, []);

  return {
    ...auth,
    logout,
  };
};

export const usePhoneRegistration = () => {
  return useMutation({
    mutationFn: phoneRegistration,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
  });
};
