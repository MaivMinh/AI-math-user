import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("access-token");
  if (!token) {
    return false;
  }
  try {
    jwtDecode(token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
