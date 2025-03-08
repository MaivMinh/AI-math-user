import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";

const currentLesson = {
  grade: 1,
  chapterOrder: 1,
  chapterName: "Làm quen với một số hình",
  lessonOrder: 3,
};

export const AppContext = createContext({
  accountId: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  currentLesson: null,
  chapters: null,
  setChapters: () => {},
  grade: null
});
export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [role, setRole] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [grade, setGrade] = useState(null);

  async function handleLogin(data) {
    const token = data.accessToken;
    localStorage.setItem("access-token", token);
    try {
      const decodedToken = jwtDecode(token);
      setAccountId(decodedToken.account_id);
      setRole(decodedToken.role);
      setIsAuthenticated(true);
      setGrade(decodedToken.grade);
    } catch (error) {
      console.log(error);
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
    const fetchData = async () => {
      const token = localStorage.getItem("access-token");
      if (token) {
        await handleLogin({ accessToken: token });
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        accountId: 2,
        role: role,
        isAuthenticated,
        logout: handleLogout,
        login: handleLogin,
        currentLesson: currentLesson,
        chapters: chapters,
        setChapters: setChapters,
        grade: grade
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
