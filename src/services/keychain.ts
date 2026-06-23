import * as Keychain from 'react-native-keychain';

export const keychain = {
  save: async (key: string, value: string): Promise<void> => {
    await Keychain.setGenericPassword(key, value);
  },
  get: async (): Promise<string | null> => {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  },
  remove: async (): Promise<void> => {
    await Keychain.resetGenericPassword();
  },
};
