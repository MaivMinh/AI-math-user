import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {

  return (
    <>
      <Header />
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
