import { create } from 'zustand';
import { api } from '@/services/api';

export enum UserRole {
  SEEKER = 'seeker',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number?: string;
  avatar_url?: string;
  role: UserRole;
  bio?: string;
  email_verified: boolean;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone_number?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  refreshAccessToken: (refreshToken: string) => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
  isLoading: false,
  error: null,

  register: async (payload: RegisterPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', payload);
      const { user, access_token, refresh_token } = response.data;

      // Store tokens
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  login: async (payload: LoginPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', payload);
      const { user, access_token, refresh_token } = response.data;

      // Store tokens and user
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({ user: null, accessToken: null, refreshToken: null });
  },

  refreshAccessToken: async (refreshToken: string) => {
    try {
      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken,
      });
      const { access_token, refresh_token: newRefreshToken } = response.data;

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', newRefreshToken);

      set({ accessToken: access_token, refreshToken: newRefreshToken });
    } catch (error) {
      // If refresh fails, logout user
      get().logout();
      throw new Error('Session expired. Please login again.');
    }
  },

  getProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/auth/profile');
      const user = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put('/auth/profile', data);
      const user = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null }),

  setUser: (user: User | null) => set({ user }),

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },
}));
