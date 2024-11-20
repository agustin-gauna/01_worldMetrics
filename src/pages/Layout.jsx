import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="mx-auto max-w-5xl pb-20">
      <Outlet />
    </main>
  );
};

export default Layout;
