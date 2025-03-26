import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../services/apiClient";

export const TitleContext = createContext({
  titles: [],
  setTitles: () => {},
});

export const TitleContextProvider = ({ children }) => {
  const [titles, setTitles] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchChapterDetails = async () => {
        try {
          const response = await apiClient.get(
            `/api/chapters/grade/${auth.grade}/details`
          );
          const data = response.data;
          setTitles(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChapterDetails();
    }
  }, [auth]);

  return (
    <TitleContext.Provider value={{ titles: titles, setTitles: setTitles }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useAppContext = () => useContext(TitleContext);
