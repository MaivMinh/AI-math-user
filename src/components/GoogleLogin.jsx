import React, { useEffect } from "react";
import apiClient from "../services/apiClient";

const GoogleLogin = () => {
  // Extract parameters from URL
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/api/user/info");
      console.log(response);
    };
    fetchData();
  });

  return <div></div>;
};

export default GoogleLogin;
