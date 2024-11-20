import React, { useEffect, useState } from "react";
import useStore from "../zustand/useStore";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

const TableModal = () => {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 30;
  const setCountriesCount = useStore((state) => state.setCountriesCount);
  const sortOption = useStore((state) => state.sortOption);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setCountriesCount(data.length);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const sortedCountries = React.useMemo(() => {
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

  const paginatedCountries = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedCountries.slice(start, end);
  }, [page, sortedCountries]);

  const totalPages = Math.ceil(countries.length / rowsPerPage);

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Flag</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn className="rounded-r-lg sm:rounded-none">
            Population
          </TableColumn>
          <TableColumn className="hidden sm:table-cell">Area(km2)</TableColumn>
          <TableColumn className="hidden sm:table-cell">Region</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedCountries.map((country) => (
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

      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          total={totalPages}
          onChange={(newPage) => setPage(newPage)}
          color="success"
          showShadow
        />
      </div>
    </div>
  );
};

export default TableModal;
