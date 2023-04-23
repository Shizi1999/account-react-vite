import { AuthResponse } from '~/types/auth.type';
import http from './http';
import { SuccessResponse } from '~/types/utils.type';

export const URL_LOGIN = 'auth/login';
export const URL_REGISTER = 'auth/register';
export const URL_LOGOUT = 'auth/logout';
export const URL_RESEND_CODE = 'resend-code';
export const URL_FORGET_PASSWORD = 'auth/forget-password';
export const URL_RESET_PASSWORD = 'reset-password';
export const URL_REFRESH_TOKEN = 'auth/refresh-token';
export const URL_VERIFY_EMAIL = '/verify';

const authApi = {
  login(body: { email: string; password: string }) {
    return http.post<SuccessResponse<AuthResponse>>(URL_LOGIN, body);
  },
  register(body: { email: string; password: string }) {
    return http.post<SuccessResponse<AuthResponse>>(URL_REGISTER, body);
  },
  resendVerifyCode() {
    return http.get<SuccessResponse<{}>>(URL_RESEND_CODE);
  },
  forgetPassword(body: { email: string }) {
    return http.post<SuccessResponse<{}>>(URL_FORGET_PASSWORD, body);
  },
  resetPassword(body: { password: string }) {
    return http.post<SuccessResponse<{}>>(URL_RESET_PASSWORD, body);
  },
  verifyEmail(body: { verifyCode: string }) {
    return http.post<SuccessResponse<{}>>(URL_VERIFY_EMAIL, body);
  }
};

export default authApi;
