import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import Loader from '@components/Loader';
import { RootState } from '@store/index';
import { bootstrapAuth } from '@/services/authBootstrap';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isHydrated } = useSelector((state: RootState) => state.auth);
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let isMounted = true;

    bootstrapAuth(dispatch).finally(() => {
      if (isMounted) {
        setIsBootstrapped(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dispatch, isHydrated]);

  if (!isHydrated || !isBootstrapped) {
    return <Loader fullScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
