import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("staffToken");

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}