import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../services/apiClient";

export const TitleContext = createContext({
  titles: [],
  setTitles: () => {},
});

export const TitleContextProvider = ({ children }) => {
  const [titles, setTitles] = useState([]);

  return (
    <TitleContext.Provider value={{ titles: titles, setTitles: setTitles }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useAppContext = () => useContext(TitleContext);
