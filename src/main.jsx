import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import Logo from "../public/assets/logo.svg";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <div
      className="text-center text-4xl md:text-5xl   absolute flex  font-bold gap-1 items-center justify-center"
      style={{ top: "-150px", left: "50%", transform: "translateX(-50%)" }}
    >
      <img src={Logo} alt="" className="w-10 h-10" />
      <div className="flex">
        <h1 className="text-white font-bold ">World</h1>
        <h1 className="text-[#17C964] font-extrabold">Metrics</h1>
      </div>
    </div>

    <main className="dark text-foreground">
      <App />
    </main>
  </NextUIProvider>
);
