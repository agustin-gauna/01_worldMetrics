import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountryByName, getCountryByCode } from "../utils/fetchData";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputModal from "./InputModal";
import Badge from "./Badge";
import ErrorPage from "../pages/ErrorPage";

const CountryModal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { country } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [neighbourData, setNeighbourData] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      const data = await getCountryByName(country);
      setCountryData(data[0]);

      if (data[0].borders) {
        const neighbours = await Promise.all(
          data[0].borders.map(async (code) => {
            const neighbour = await getCountryByCode(code);
            return neighbour[0];
          })
        );
        setNeighbourData(neighbours);
      }
    };

    fetchCountryData();
  }, [country]);

  if (!countryData) return <ErrorPage />;

  const goHome = () => {
    navigate("/");
  };

  const fields = [
    { label: "Capital", value: countryData.capital?.[0] },
    { label: "Region", value: countryData.region },
    { label: "Subregion", value: countryData.subregion },
    {
      label: "Currency",
      value: countryData.currencies
        ? Object.values(countryData.currencies)[0].name
        : "N/A",
    },
    {
      label: "Languages",
      value: countryData.languages
        ? Object.values(countryData.languages).join(", ")
        : "N/A",
    },
    { label: "Coordinates", value: countryData.latlng?.join(", ") || "N/A" },
  ];

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-[#18181B] sm:rounded-lg p-4 w-full border-[1px] border-[#282B30]">
        <header className="flex flex-col gap-4 pt-8">
          {location.pathname !== "/" && (
            <button
              onClick={goHome}
              className="self-start text-[#6C727F] font-bold underline hover:text-[#dee0e4] transition-colors"
            >
              ↩ Return to home
            </button>
          )}

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 ">
            <h3 className="text-[#17C964] font-bold">
              Complete information about {countryData.name.common}
            </h3>
            <InputModal />
          </div>
        </header>

        <div className="mt-20 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-8">
            <img
              src={countryData.flags.svg}
              alt={`Flag of ${countryData.name.common}`}
              className="w-96 rounded-xl mx-auto"
            />
            <h1 className="text-3xl font-bold">{countryData.name.common}</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Badge
              title={"Population"}
              data={countryData.population.toLocaleString()}
            ></Badge>

            <Badge
              title={"Area(km²)"}
              data={countryData.area.toLocaleString()}
            ></Badge>
          </div>

          <div className="flex flex-col">
            {fields.map(({ label, value }, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-700"
              >
                <span className="text-gray-400 font-medium">{label}</span>
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 font-medium mb-4">
              Neighbouring Countries
            </span>
            <div className="flex flex-wrap gap-4">
              {neighbourData.map((neighbour, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <img
                    src={neighbour.flags.svg}
                    alt={`Flag of ${neighbour.name.common}`}
                    className="w-20 h-12 rounded-sm shadow"
                  />
                  <span className="text-white text-sm font-medium">
                    {neighbour.name.common}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
