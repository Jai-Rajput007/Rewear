export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  ITEMS: {
    LIST: `${API_BASE_URL}/items`,
    DETAIL: (id: string) => `${API_BASE_URL}/items/${id}`,
    CREATE: `${API_BASE_URL}/items`,
    UPDATE: (id: string) => `${API_BASE_URL}/items/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/items/${id}`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE: `${API_BASE_URL}/user/profile`,
  },
};
