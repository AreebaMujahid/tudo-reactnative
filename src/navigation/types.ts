import { ROUTES } from '@constants/routes';
import { Product } from '@/types/product';

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
};

export type HomeStackParamList = {
  [ROUTES.HOME]: undefined;

  ProductDetails: {
    product: Product;
  };

  Checkout: {
    product: Product;
  };

  OrderSuccess: undefined;
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
