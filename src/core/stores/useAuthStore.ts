import { create } from "zustand";
import type { IUser } from "@/core/types/IAuth";

interface AuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoadingPage: boolean;
  error: string | null;

  setUser: (user: IUser | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLoadingPage: (loadingPage: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: true,
  isLoading: false,
  isLoadingPage: false,
  error: null,

  setUser: (user) => {
    set({
      user: user,
      isLoggedIn: !!user,
      error: null,
    });
  },
  setLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingPage: (isLoadingPage) => set({ isLoadingPage: isLoadingPage }),

  setError: (error) => set({ error: error, isLoading: false }),

  logout: () => {
    set({ user: null, isLoggedIn: false, isLoading: false, error: null });
    localStorage.removeItem("user_data");
  },
}));
