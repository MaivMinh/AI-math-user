import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext({
  auth: {
    accountId: null,
    role: null,
    isAuthenticated: false,
    grade: null,
  },
  login: () => {},
  logout: () => {},
  loading: null,
});
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: null,
    accountId: null,
    role: null,
    grade: null,
  });

  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage when app starts
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const storedUser = JSON.parse(localStorage.getItem("user")); // Store user info separately
    if (token && storedUser) {
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: true,
          accountId: storedUser.accountId,
          role: storedUser.role,
          grade: storedUser.grade,
        };
      });
    }
    setLoading(false);
  }, []);

  async function handleLogin(token) {
    try {
      const decodedToken = jwtDecode(token);
      const user = JSON.stringify({
        isAuthenticated: true,
        accountId: decodedToken.account_id,
        role: decodedToken.role,
        grade: decodedToken.grade,
      });
      localStorage.setItem("access-token", token);
      localStorage.setItem("user", user);
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: true,
          accountId: decodedToken.account_id,
          role: decodedToken.role,
          grade: decodedToken.grade,
        };
      });
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      return;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuth((prev) => {
      return {
        ...prev,
        isAuthenticated: false,
        accountId: null,
        role: null,
        grade: null,
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
