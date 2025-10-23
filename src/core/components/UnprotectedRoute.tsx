import React, { lazy } from "react";
const LoadingPage = lazy(() => import("@/core/components/LoadingPage"));
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/core/stores/useAuthStore";

interface UnprotectedRouteProps {
  children: React.ReactNode;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoadingPage } = useAuthStore();

  if (isLoadingPage) {
    return <LoadingPage />;
  }

  if (isLoggedIn) {
    return <Navigate to="/course" replace />;
  }

  return <>{children}</>;
};

export default UnprotectedRoute;
