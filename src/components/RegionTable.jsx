import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import useStore from "../zustand/useStore";

const RegionTable = () => {
  const { region } = useParams();
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const setCountriesCount = useStore((state) => state.setCountriesCount);
  const sortOption = useStore((state) => state.sortOption);

  useEffect(() => {
    const fetchCountriesByRegion = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
        setCountriesCount(data.length);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCountriesByRegion();
  }, [region, setCountriesCount]);

  const sortedCountries = useMemo(() => {
    if (!countries.length) return [];

    const sorted = [...countries];
    switch (sortOption) {
      case "Name (Asc)":
        sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
      case "Name (Desc)":
        sorted.sort((a, b) => b.name.common.localeCompare(a.name.common));
        break;
      case "Population (Asc)":
        sorted.sort((a, b) => a.population - b.population);
        break;
      case "Population (Desc)":
        sorted.sort((a, b) => b.population - a.population);
        break;
      case "Area (Asc)":
        sorted.sort((a, b) => (a.area || 0) - (b.area || 0));
        break;
      case "Area (Desc)":
        sorted.sort((a, b) => (b.area || 0) - (a.area || 0));
        break;
      case "Region (Asc)":
        sorted.sort((a, b) => (a.region || "").localeCompare(b.region || ""));
        break;
      case "Region (Desc)":
        sorted.sort((a, b) => (b.region || "").localeCompare(a.region || ""));
        break;
      default:
        break;
    }

    return sorted;
  }, [sortOption, countries]);

  if (error) return <p>Error: {error}</p>;

  return (
    <Table aria-label={`Countries in ${region}`}>
      <TableHeader>
        <TableColumn>Flag</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn className="rounded-r-lg sm:rounded-none">
          Population
        </TableColumn>
        <TableColumn className="hidden sm:table-cell">Area (km²)</TableColumn>
        <TableColumn className="hidden sm:table-cell">Region</TableColumn>
      </TableHeader>
      <TableBody>
        {sortedCountries.map((country) => (
          <TableRow key={country.cca3}>
            <TableCell>
              <img
                src={country.flags?.svg}
                alt={`${country.name.common} Flag`}
                className="w-10 h-6 object-contain"
              />
            </TableCell>
            <TableCell>{country.name.common}</TableCell>
            <TableCell>{country.population.toLocaleString()}</TableCell>
            <TableCell className="hidden sm:table-cell">
              {country.area?.toLocaleString() || "N/A"}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {country.region || "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RegionTable;
