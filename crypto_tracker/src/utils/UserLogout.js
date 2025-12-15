import { Navigate } from "react-router-dom";

export default function UserLogout() {
  localStorage.removeItem("userToken");
  return <Navigate to="/login" replace />;
}
