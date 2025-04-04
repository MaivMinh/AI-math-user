import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../services/apiClient";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  auth: {
    email: null,
    role: null,
    isAuthenticated: false,
    grade: null,
    userId: null,
  },
  login: () => {},
  logout: () => {},
  loading: null,
});
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: null,
    isAuthenticated: null,
    role: null,
    grade: null,
    userId: null,
  });
  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage when app starts
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      const fetchData = async () => {
        try {
          const decodedToken = jwtDecode(token);
          const id = decodedToken.sub;
          const response = await apiClient.get(`/api/enrollment/id/${id}`);
          const grade = response.data?.grade;
          setAuth((prev) => {
            return {
              ...prev,
              isAuthenticated: true,
              email: decodedToken.email,
              role: decodedToken.Role,
              userId: decodedToken.sub,
              grade: grade === undefined ? 1 : grade,
            };
          });
        } catch (error) {
          console.log(error);
          setAuth((prev) => {
            return {
              ...prev,
              isAuthenticated: false,
              email: null,
              role: null,
              grade: null,
              userId: null,
            };
          });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: false,
          email: null,
          role: null,
          grade: null,
          userId: null,
        };
      });
      setLoading(false);
    }
  }, []);

  async function handleLogin(token) {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("access-token", token);
      const id = decodedToken.sub;
      const response = await apiClient.get(`/api/enrollment/id/${id}`);
      const grade = response.data?.grade;
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: true,
          email: decodedToken.email,
          role: decodedToken.Role,
          userId: decodedToken.sub,
          grade: grade === undefined ? 1 : grade,
        };
      });
    } catch (error) {
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: false,
          email: null,
          role: null,
          grade: null,
          userId: null,
        };
      });
      localStorage.removeItem("access-token");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    Cookies.remove("ACCESS_TOKEN")
    Cookies.remove("REFRESH_TOKEN")
    Cookies.remove(".AspNetCore.Cookies")
    setAuth((prev) => {
      return {
        ...prev,
        isAuthenticated: false,
        email: null,
        role: null,
        grade: null,
        userId: null,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: auth,
        login: handleLogin,
        logout: handleLogout,
        loading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AuthContext);
