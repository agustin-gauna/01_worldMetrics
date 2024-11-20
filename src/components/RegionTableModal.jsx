import React from "react";
import RegionTable from "./RegionTable";
import HeaderModal from "./HeaderModal";

const RegionTableModal = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-[#18181B] border-[1px] border-[#282B30] p-4 sm:rounded-lg shadow-lg flex flex-col gap-8 w-full">
          <HeaderModal />

          <RegionTable />
        </div>
      </div>
    </>
  );
};

export default RegionTableModal;
