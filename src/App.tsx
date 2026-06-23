import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { store, persistor } from '@store/index';
import { queryClient } from '@api/queryClient';
import RootNavigator from '@navigation/RootNavigator';
import Loader from '@components/Loader';

const App = () => (
  <GestureHandlerRootView style={styles.root}>
    <Provider store={store}>
      <PersistGate loading={<Loader fullScreen />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <RootNavigator />
            <Toast />
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
