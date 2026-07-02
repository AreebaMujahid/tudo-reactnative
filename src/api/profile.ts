import { api } from './axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export interface ProfileParams {
  launch: number;
  deviceType: number;
  deviceToken?: string;
}

const getCurrentDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

export const buildProfileParams = (params: ProfileParams) => {
  return {
    launch: params.launch,

    device_type: params.deviceType,

    device_token: params.deviceToken ?? '',

    current_date: getCurrentDate(),

    date_time: new Date().toISOString(),
  };
};

export const getProfile = async (params: ProfileParams) => {
  const response = await api.get(API_ENDPOINTS.PROFILE, {
    params: buildProfileParams(params),
  });

  return response.data;
};
