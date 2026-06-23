import { AuthResponse, LoginPayload, RegisterPayload, User } from './authTypes';

const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
};

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    await delay(800);
    if (payload.email && payload.password.length >= 8) {
      return {
        user: { ...MOCK_USER, email: payload.email },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await delay(800);
    return {
      user: {
        id: Date.now().toString(),
        email: payload.email,
        name: payload.name,
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  },

  logout: async (): Promise<void> => {
    await delay(300);
  },
};
