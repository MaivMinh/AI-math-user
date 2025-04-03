import React, { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../services/apiClient";

export const UserContext = createContext({
  user: {
    userId: null,
    userName: null,
    gender: null,
    balance: null,
    isPremium: null,
    dob: null,
    avatar: null,
    status: null,
    email: null,
    phoneNumber: null,
  },
  loading: null,
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    userId: null,
    userName: null,
    gender: null,
    balance: null,
    isPremium: null,
    dob: null,
    avatar: null,
    status: null,
    email: null,
    phoneNumber: null,
  });

  const [loading, setLoading] = React.useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchUserInfo = async () => {
        try {
          const response = await apiClient.get("/api/user/info");
          const userInfo = response.data;
          setUser((prev) => {
            return {
              ...prev,
              userId: userInfo.userId,
              userName: userInfo.userName,
              gender: userInfo.gender,
              balance: userInfo.balance,
              isPremium: userInfo.isPremium,
              dob: userInfo.dob,
              avatar: userInfo.avatar,
              status: userInfo.status,
              email: userInfo.email,
              phoneNumber: userInfo.phoneNumber,
            };
          });
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUser((prev) => {
            return {
              ...prev,
              userId: null,
              userName: null,
              gender: null,
              balance: null,
              isPremium: null,
              dob: null,
              avatar: null,
              status: null,
              email: null,
              phoneNumber: null,
            };
          });
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [auth]);

  return (
    <UserContext.Provider value={{ user: user, loading: loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
