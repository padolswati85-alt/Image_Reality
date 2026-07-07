import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until Firebase resolves auth state
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Admin-only route protection
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
}
