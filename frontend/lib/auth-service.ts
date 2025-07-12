import { API_ENDPOINTS } from "./config";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AuthError(data.message || 'Failed to login');
  }

  // Store the token
  localStorage.setItem('token', data.token);
  
  return data;
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AuthError(data.message || 'Failed to register');
  }

  return data;
}

export async function logout(): Promise<void> {
  try {
    await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } finally {
    localStorage.removeItem('token');
  }
}

export function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

// Helper function to check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getToken();
}
