export const ROUTES = {
  SPLASH: 'Splash',
  AUTH: 'Auth',
  LOGIN: 'Login',
  REGISTER: 'Register',
  MAIN: 'Main',
  HOME: 'Home',
  PROFILE: 'Profile',
  PASSWORD: 'Password',
  SETTINGS: 'Settings',
  COMPLETE_SIGNUP: 'Complete-signup',
  OTP: 'Otp',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
