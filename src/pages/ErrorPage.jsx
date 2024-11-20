import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#18181B] text-[#6C727F] rounded-lg h-screen gap-2 border-[1px] border-[#282B30]">
      <h1 className="font-black text-5xl">404 not found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="font-bold underline hover:text-[#dee0e4] transition-colors"
      >
        ↩ Go back to the home page
      </Link>
    </div>
  );
};

export default ErrorPage;
