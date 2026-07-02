import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '@constants/storageKeys';

export const authStorage = {
  async saveToken(token: string): Promise<void> {
    await Keychain.setGenericPassword(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials) {
      return null;
    }

    return credentials.password;
  },

  async removeToken(): Promise<void> {
    await Keychain.resetGenericPassword();
  },

  async clearSession(): Promise<void> {
    await this.removeToken();
  },
};
