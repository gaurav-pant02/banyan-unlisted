import { Navigate } from "react-router-dom";
import { getSession } from "@/lib/auth";
import type { ReactElement } from "react";

type ProtectedRouteProps = {
  allow: "client" | "admin";
  children: ReactElement;
};

const ProtectedRoute = ({ allow, children }: ProtectedRouteProps) => {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (allow === "admin" && session.user.kind !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (allow === "client" && session.user.kind !== "client") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
