import React from "react";

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex justify-between py-2 border-b border-gray-700">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className="text-white">{value || "N/A"}</span>
    </div>
  );
};

export default InfoRow;
