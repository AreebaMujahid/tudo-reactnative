/**
 * @format
 */

import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '../src/App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => () => ({
  requestPermission: jest.fn(),
  getToken: jest.fn(),
  AuthorizationStatus: {AUTHORIZED: 1, PROVISIONAL: 2},
}));

jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  displayNotification: jest.fn(),
  AndroidImportance: {HIGH: 4},
}));

it('renders correctly', () => {
  renderer.create(<App />);
});
