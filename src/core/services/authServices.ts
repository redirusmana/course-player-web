import type { AxiosError } from "axios";
import api from "@/core/api/api";
import { useAuthStore } from "@/core/stores/useAuthStore";
import type { ILoginResponse } from "@/core/types/IAuth";

export const authService = {
  login: async (email: string, password: string): Promise<ILoginResponse> => {
    const { setUser, setLoading, setError } = useAuthStore.getState();
    setLoading(true);

    try {
      const response = await api.post<ILoginResponse>("/login", {
        email,
        password,
      });

      const responseData = response.data;

      if (responseData.status === 200 && responseData.data) {
        setUser(responseData.data);
        localStorage.setItem("user_data", JSON.stringify(responseData.data));
      } else {
        setError(responseData.message || "Login gagal.");
        throw new Error(responseData.message || "Login gagal.");
      }

      return responseData;
    } catch (error_: unknown) {
      const error = error_ as AxiosError;
      console.error(error.response?.data || error.message);

      const errorMessage = error.message || "Terjadi kesalahan saat login.";
      setError(errorMessage);

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  },

  loadUserFromCookie: async (): Promise<void> => {
    const { setUser, setLoadingPage, logout, setLoggedIn } =
      useAuthStore.getState();

    setLoggedIn(true);
    setLoadingPage(true);
    let isSuccessful = false;

    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user_data") || "null"
      );

      if (storedUser?.user_id) {
        const response = await api.get(
          "/user/" + storedUser.user_id + "/courses/active"
        );

        if (response.status === 200) {
          setUser(storedUser);
          isSuccessful = true;
          return;
        }
      }
    } catch (error_: unknown) {
      const error = error_ as AxiosError;
      console.warn(error.message);

      logout();
    } finally {
      if (!isSuccessful) {
        setLoggedIn(false);
        logout();
      }

      setLoadingPage(false);
    }
  },
};
