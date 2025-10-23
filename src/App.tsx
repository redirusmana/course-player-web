import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authService } from "@/core/services/authServices";
import { useAuthStore } from "@/core/stores/useAuthStore";

const LoadingPage = lazy(() => import("@/core/components/LoadingPage"));
const NotFoundPage = lazy(() => import("@/core/components/NotFoundPage"));
const UnprotectedRoute = lazy(() => import("@/core/components/UnprotectedRoute"));
const ProtectedRoute = lazy(() => import("@/core/components/ProtectedRoute"));
const LoginPage = lazy(() => import("@/modules/auth/views/LoginPage"));
const CoursePage = lazy(() => import("@/modules/course/views/CoursePage"));
const CourseDetailPage = lazy(
  () => import("@/modules/course/views/CourseDetailPage")
);

function App() {
  useEffect(() => {
    authService.loadUserFromCookie();
  }, []);

  const { isLoadingPage } = useAuthStore();

  if (isLoadingPage) {
    return <LoadingPage />;
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/course"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/course" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
