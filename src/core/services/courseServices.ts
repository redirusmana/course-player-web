import type { AxiosError } from "axios";
import api from "@/core/api/api";
import { useCourseStore } from "@/core/stores/useCourseStore";
import type {
  IMyCoursesResponse,
  IDetailCourseResponse,
} from "@/core/types/ICourse";
import { useAuthStore } from "@/core/stores/useAuthStore";

export const courseService = {
  fetchMyCourses: async (): Promise<void> => {
    const { user } = useAuthStore.getState();
    const { setMyCourses, setLoading, setError } = useCourseStore.getState();

    setLoading(true);

    try {
      const endpoint = `/user/${user?.user_id}/courses/active`;

      const response = await api.get<IMyCoursesResponse>(endpoint);

      if (response.data.status === 200) {
        setMyCourses(response.data.data);
      } else {
        setError(response.data.message || "Gagal mengambil data kursus.");
      }
    } catch (error_: unknown) {
      const error = error_ as AxiosError;
      console.error(error.response?.data || error.message);

      setError("Gagal mengambil data kursus.");
    } finally {
      setLoading(false);
    }
  },

  fetchDetailCourse: async (course_id: number): Promise<void> => {
    const { user } = useAuthStore.getState();
    const { setDetailCourse, setLoading, setError } = useCourseStore.getState();

    setLoading(true);

    try {
      const endpoint = `/course?course_id=${course_id}&user_id=${user?.user_id}`;

      const response = await api.get<IDetailCourseResponse>(endpoint);

      if (response.data.status === 200) {
        setDetailCourse(response.data.data);
      } else {
        setError(response.data.message || "Gagal mengambil detail kursus.");
      }
    } catch (error_: unknown) {
      const error = error_ as AxiosError;
      console.error(error.response?.data || error.message);
      setError("Gagal mengambil detail kursus.");
    } finally {
      setLoading(false);
    }
  },
};
