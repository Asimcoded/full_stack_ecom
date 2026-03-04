import type { LoginInterface, RegisterInterface } from '@/interfaces/auth.interface';
import api from '@/services/api';

export const loginUser = (data: LoginInterface) => api.post('/auth/login', data);

export const registerUser = (data: RegisterInterface) => api.post('/auth/register', data);

export const getProfile = () => api.get('/auth/profile');

export const verifyTokenAPI = (token: string) =>
  api.post('/auth/verifyPasswordResetToken', { token });

export const resetPasswordAPI = (data: { userId: string; password: string }) =>
  api.post('/auth/setnewpassword', data);

export const requestPasswordResetAPI = (email: string) =>
  api.post("/auth/resetpassword", { email })

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  return response.data;
};