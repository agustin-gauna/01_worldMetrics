import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCountryByName } from "../utils/fetchData";

import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const InputModal = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce(async (name) => {
      if (!name.trim()) {
        setResults([]);
        return;
      }
      const countries = await getCountryByName(name);
      setResults(countries);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleSelect = (selectedKey) => {
    const selectedCountry = results.find(
      (country) => country.name.common === selectedKey
    );
    if (selectedCountry) {
      const countryNameInLowerCase = selectedCountry.name.common.toLowerCase();
      navigate(`/country/${countryNameInLowerCase}`);
    }
  };

  return (
    <div className="flex flex-col ">
      <Autocomplete
        className="max-w-xs"
        label="Type a country name"
        value={query}
        onInputChange={(value) => setQuery(value)}
        onSelectionChange={(value) => handleSelect(value)}
        items={results.map((country) => ({
          key: country.name.common,
          text: country.name.common,
          flag: country.flags?.svg,
        }))}
      >
        {(item) => (
          <AutocompleteItem
            key={item.key}
            startContent={
              <Avatar
                src={item.flag}
                alt={`Flag of ${item.text}`}
                className="w-6 h-6"
              />
            }
          >
            {item.text}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default InputModal;
