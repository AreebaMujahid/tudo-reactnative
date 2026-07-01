import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const getDevicePayload = async () => {
  return {
    device_type: Platform.OS === 'android' ? '1' : '2',

    device_token: '',

    device_model: DeviceInfo.getModel(),

    hash: '',
  };
};
