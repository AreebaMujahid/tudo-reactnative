import { ROUTES } from '@constants/routes';

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
};

export type MainTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
};

export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.AUTH]: undefined;
  [ROUTES.MAIN]: undefined;
};
