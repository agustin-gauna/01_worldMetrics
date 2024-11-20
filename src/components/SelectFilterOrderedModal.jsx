import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import useStore from "../zustand/useStore";
const SelectFilterOrderedModal = () => {
  const setSortOption = useStore((state) => state.setSortOption);

  return (
    <div className="flex flex-grow">
      <Select
        className="max-w-xs"
        label="Sort by"
        variant="bordered"
        aria-label="Sort by"
        onSelectionChange={(keys) => setSortOption(keys.currentKey)} //
      >
        <SelectItem key="Name (Asc)">Name (Asc)</SelectItem>
        <SelectItem key="Name (Desc)">Name (Desc)</SelectItem>
        <SelectItem key="Population (Asc)">Population (Asc)</SelectItem>
        <SelectItem key="Population (Desc)">Population (Desc)</SelectItem>
        <SelectItem key="Area (Asc)">Area (Asc)</SelectItem>
        <SelectItem key="Area (Desc)">Area (Desc)</SelectItem>
        <SelectItem key="Region (Asc)">Region (Asc)</SelectItem>
        <SelectItem key="Region (Desc)">Region (Desc)</SelectItem>
      </Select>
    </div>
  );
};

export default SelectFilterOrderedModal;
