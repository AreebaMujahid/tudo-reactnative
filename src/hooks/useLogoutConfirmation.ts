import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '@hooks/useAuth';

export const useLogoutConfirmation = () => {
  const { logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const openLogoutConfirmation = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const closeLogoutConfirmation = useCallback(() => {
    if (isLoggingOut) {
      return;
    }

    setIsModalVisible(false);
  }, [isLoggingOut]);

  const confirmLogout = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
      setIsModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Logged out',
        text2: 'Your session has been cleared.',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Logout failed',
        text2: 'Please try again.',
      });
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout]);

  return {
    isModalVisible,
    isLoggingOut,
    openLogoutConfirmation,
    closeLogoutConfirmation,
    confirmLogout,
  };
};
