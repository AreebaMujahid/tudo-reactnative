import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '@constants/storageKeys';
export const authStorage = {
  async saveToken(token: string) {
    await Keychain.setGenericPassword(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getToken() {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials) {
      return null;
    }

    return credentials.password;
  },

  async removeToken() {
    await Keychain.resetGenericPassword();
  },
};
