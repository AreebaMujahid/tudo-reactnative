import { useMutation } from '@tanstack/react-query';
import { phoneRegistration, registerUser } from '../api/authApi';
import { verifyOtp } from '../api/authApi';
import { loginUser } from '../api/authApi';

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