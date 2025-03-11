import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";

const currentLesson = {
  grade: 1,
  chapterOrder: 1,
  chapterName: "Làm quen với một số hình",
  lessonOrder: 3,
};

export const AuthContext = createContext({
  accountId: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  currentLesson: null,
  grade: null,
});
export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [role, setRole] = useState(null);
  const [grade, setGrade] = useState(null);

  async function handleLogin(token) {
    try {
      const decodedToken = jwtDecode(token);
      setAccountId(decodedToken.account_id);
      setRole(decodedToken.role);
      setIsAuthenticated(true);
      setGrade(decodedToken.grade);
      localStorage.setItem("access-token", token);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      return;
    }
  }

  function handleLogout() {
    localStorage.removeItem("access-token");
    setIsAuthenticated(false);
    setAccountId(null);
    setRole(null);
    setGrade(null);
  }

  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem("access-token");
      if (token) {
        handleLogin(token);
      }
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accountId: 2,
        role: role,
        isAuthenticated,
        logout: handleLogout,
        login: handleLogin,
        currentLesson: currentLesson,
        grade: grade,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AuthContext);
