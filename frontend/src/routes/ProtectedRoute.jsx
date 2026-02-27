import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("staffToken");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}