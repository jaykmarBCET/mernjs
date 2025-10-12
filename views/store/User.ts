// /store/userStore.ts
import { create } from 'zustand'
import axios from 'axios'

interface UserInfo {
  _id?: string;
  name: string;
  email: string;
  role?: string;
}

interface UserStoreInfo {
  user: UserInfo | null;
  isLoading: boolean;
  register: (data: { name: string; password: string; email: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  update: (data: { name: string; email: string; password?: string }) => Promise<void>;
  getUser: () => Promise<void>;
}

const useUserStore = create<UserStoreInfo>((set) => ({
  user: null,
  isLoading: false,

  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('/api/user/profile/register', data, { withCredentials: true });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Register Error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('/api/user/profile/login', data, { withCredentials: true });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  update: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.put('/api/user/profile/update', data, { withCredentials: true });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Update Profile Error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getUser: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get('/api/user/profile', { withCredentials: true });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Get User Error:", error);
      set({ user: null }); // optional: clear user on failure
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
