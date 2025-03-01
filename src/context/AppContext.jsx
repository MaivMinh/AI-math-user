import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";

const currentLesson = {
  "grade": 1,
  "chapterOrder": 1,
  "chapterName": "Làm quen với một số hình",
  "lessonOrder": 3,
};


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
  const [grade, setGrade] = useState(null);

  function handleLogin(data) {
    const token = data.accessToken;
    localStorage.setItem("access-token", token);
    try {
      const decodedToken = jwtDecode(token);
      setAccountId(decodedToken.account_id);
      setRole(decodedToken.role);
      setIsAuthenticated(true);
      setGrade(decodedToken.grade);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("access-token");
      return;
    }
  }

  function handleLogout() {
    localStorage.removeItem("access-token");
    setIsAuthenticated(false);
    setAccountId(null);
    setRole(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      handleLogin({ accessToken: token });
    } else
      handleLogin({
        accessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBSSBNYXRoIGFwcGxpY2F0aW9uIiwiaWF0IjoxNzQwNzE3OTYzLCJleHAiOjE3NzIyNTM5NjMsImF1ZCI6IiIsInN1YiI6ImFjY2VzcyB0b2tlbiIsInJvbGUiOiJVU0VSIiwiYWNjb3VudF9pZCI6IjEiLCJncmFkZSI6IjEifQ.L6gDofA9j5NRpclABN3Ahjtr490niBz48mhqagGChPw",
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        accountId: accountId,
        role: role,
        isAuthenticated,
        logout: handleLogout,
        login: handleLogin,
        currentLesson: currentLesson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
