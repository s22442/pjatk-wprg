import { rest } from '~/helpers/api';

import type { AuthPayload } from '~/types/api';

export const logIn = async (data: AuthPayload) => {
  const response = await rest.post<{ token: string }>('/auth/login', data);
  return { ...response, data: response.data?.token || null };
};

export const register = async (data: AuthPayload) => {
  const response = await rest.post<{ token: string }>('/auth/register', data);
  return { ...response, data: response.data?.token || null };
};
