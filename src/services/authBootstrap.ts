import { Platform } from 'react-native';
import axios from 'axios';
import { AppDispatch, store } from '@store/index';
import { setCredentials } from '@features/auth/authSlice';
import { authStorage } from '@/services/authStorage';
import { clearAuthSession } from '@/services/authSessionService';
import { getProfile } from '@/api/profile';
import { getDeviceInfo } from '@/services/deviceService';

export const bootstrapAuth = async (dispatch: AppDispatch): Promise<void> => {
  const token = await authStorage.getToken();

  if (!token) {
    await clearAuthSession({ skipQueryCache: true });
    return;
  }

  dispatch(
    setCredentials({
      accessToken: token,
      refreshToken: null,
      user: store.getState().auth.user,
    }),
  );

  try {
    const deviceInfo = await getDeviceInfo();
    const profileResponse = await getProfile({
      launch: 1,
      deviceType: Platform.OS === 'android' ? 1 : 2,
      deviceToken: deviceInfo.device_token,
    });

    const profileUser = profileResponse?.data ?? profileResponse?.user ?? profileResponse;

    dispatch(
      setCredentials({
        accessToken: token,
        refreshToken: null,
        user: profileUser,
      }),
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await clearAuthSession({ skipQueryCache: true });
      return;
    }

    dispatch(
      setCredentials({
        accessToken: token,
        refreshToken: null,
        user: store.getState().auth.user,
      }),
    );
  }
};
