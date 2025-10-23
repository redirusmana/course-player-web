import React, { lazy } from "react";
const LoadingPage = lazy(() => import("@/core/components/LoadingPage"));
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/core/stores/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoadingPage } = useAuthStore();
 
  if (isLoadingPage) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
