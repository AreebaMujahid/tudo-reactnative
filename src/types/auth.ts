export interface RegisterPayload {
  phone: string;
  password: string;
  device_type: string;
  device_token: string;
  device_model: string;
  hash: string;
  user_type: number;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user_type: number;
}

export interface PhoneRegistrationPayload {
  phone: string;
  user_type: number;
}
export interface PhoneRegistrationResponse {
  success: boolean;
  message: string;
}
