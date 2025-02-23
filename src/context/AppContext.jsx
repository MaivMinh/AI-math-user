import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";

export const AppContext = createContext({
  accountId: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [role, setRole] = useState(null);

  function handleLogin(data) {
    const token = data.accessToken;
    localStorage.setItem("access-token", token);
    try {
      const decodedToken = jwtDecode(token);
      setAccountId(decodedToken.account_id);
      setRole(decodedToken.role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setIsAuthenticated(false);
      return;
    }
  }

  function handleLogout() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("profile");
    setIsAuthenticated(false);
    setAccountId(null);
    setRole(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      handleLogin({ accessToken: token });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        accountId: accountId,
        role: role,
        isAuthenticated,
        logout: handleLogout,
        login: handleLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
