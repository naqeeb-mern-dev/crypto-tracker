import { Navigate } from "react-router-dom";

export default function AdminLogout() {
  localStorage.removeItem("adminToken");
  return <Navigate to="/admin-login" replace />;
}
