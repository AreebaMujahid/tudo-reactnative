import { api } from './axios';
import { formatTurkeyPhone } from '@/utils/phone';
import {
    PhoneRegistrationPayload,
    PhoneRegistrationResponse,
    RegisterPayload,
    RegisterResponse,
} from '../types/auth';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const phoneRegistration = async (
    payload: PhoneRegistrationPayload,
): Promise<PhoneRegistrationResponse> => {
    const requestBody = {
        ...payload,
        phone: formatTurkeyPhone(payload.phone),
    };
    console.log('Request Body:', requestBody);
    const response = await api.post(API_ENDPOINTS.PHONE_REGISTRATION, requestBody);
    return response.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    console.log('payload receive in /register endpoint is', payload);
    const { data } = await api.post(API_ENDPOINTS.REGISTER, payload);

    return data;
};
export type VerifyOtpPayload = {
    phone: string;
    otp: string;
    user_type: number;
};

export type VerifyOtpResponse = {
    success: boolean;
    message: string;
    token?: string;
};

export const verifyOtp = async (
    payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> => {
    const response = await api.post(
        API_ENDPOINTS.VERIFY_OTP,
        payload,
    );

    return response.data;
};

export interface LoginPayload {
    phone: string;
    password: string;
    device_type: string;
    device_token: string;
    device_model: string;
    user_type?: number;
}

export const loginUser = async (
    payload: LoginPayload,
) => {
    const response = await api.post(
        API_ENDPOINTS.LOGIN,
        payload,
    );

    return response.data;
};
