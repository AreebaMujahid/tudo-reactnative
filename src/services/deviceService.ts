import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async () => {
  return {
    device_type: Platform.OS === 'android' ? '1' : '2',

    device_model: DeviceInfo.getModel(),

    device_token: '',

    hash: '',
  };
};
