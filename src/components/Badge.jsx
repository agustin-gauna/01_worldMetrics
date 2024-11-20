import React from "react";
import { Divider } from "@nextui-org/react";

const Badge = ({ title, data }) => {
  return (
    <div className="bg-[#282B30] rounded-xl px-6 py-4 flex items-center gap-4  justify-center">
      <p>{title}</p>
      <div className="w-[1px] h-full bg-gray-500 min-h-5"></div>
      <p>{data}</p>
    </div>
  );
};

export default Badge;
