import api from './api';

interface User {
  email: string;
  password: string;
}

interface ServiceResponse {
  Data: any;
  Success: boolean;
}


export const register = async (user: User) => {
  const response = await api.post<ServiceResponse>('/auth/register', user);
  return response;
};

export const login = async (user: User) => {
  const response = await api.post<string>('/auth/login', user);
  return response.data;
};