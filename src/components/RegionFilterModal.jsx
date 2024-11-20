import React, { useState } from "react";

import { Link } from "react-router-dom";

const RegionFilterModal = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const regions = ["Americas", "Africa", "Asia", "Europe", "Oceania"];

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="text-[#6C727F] font-bold flex flex-col gap-2">
      <h3>Region</h3>

      <div className="flex flex-wrap gap-4">
        {regions.map((region) => (
          <Link
            to={`/${region.toLowerCase()}`}
            className={`px-4 py-2 bg-[#27272a]  rounded-lg transition-colors ${
              selectedRegion === region
                ? "bg-[#3a3a3c] text-[#17C964]" // Color verde si es seleccionado
                : "hover:bg-[#3a3a3c] hover:text-[#17C964]"
            }`}
            key={region}
            onClick={() => handleSelectRegion(region)}
            aria-label={`Select region ${region}`}
          >
            {region}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RegionFilterModal;
