import React from "react";
import InputModal from "./InputModal";
import SelectFilterOrderedModal from "./SelectFilterOrderedModal";
import RegionFilterModal from "./RegionFilterModal";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../zustand/useStore";

const HeaderModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const countriesCount = useStore((state) => state.countriesCount);

  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="flex flex-col gap-4 pt-8">
      {location.pathname !== "/" && (
        <button
          onClick={goHome}
          className="self-start text-[#6C727F] font-bold underline hover:text-[#dee0e4] transition-colors"
        >
          Return to home
        </button>
      )}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
        <h3 className="text-[#17C964] font-bold">
          Found {countriesCount} countries
        </h3>
        <InputModal />
      </div>

      <SelectFilterOrderedModal />

      <RegionFilterModal />
    </header>
  );
};

export default HeaderModal;
