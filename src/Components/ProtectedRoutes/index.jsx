import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoutes() {
  const jwtToken = Cookies.get("jwt_token");
  return jwtToken ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
