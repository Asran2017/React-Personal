// import { countries } from "./data/countries";
import { useEffect, useState } from "react";
import { ErrorMessage } from "./UI_Comps/ErrorMessage.jsx";
import { Loader } from "./UI_Comps/Loader.jsx";
import { CountryList } from "./UI_Comps/CountryList.jsx";
import { SearchBar } from "./UI_Comps/SearchBar.jsx";
import { DetailsRow } from "./UI_Comps/DetailsRow.jsx";
import { InitialCard } from "./UI_Comps/InitialCard.jsx";

export default function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]); //all countries state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [displayCountryName, setDisplayCountryName] = useState(""); //select country to display details

  const filteredCountry = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase()) &&
      (country.region === regionFilter || regionFilter === "All"),
  );
  // const countryDetails = countries.find(
  //   (country) => country.name.common === displayCountryName,
  // );

  const handleCountryClick = (name) => {
    displayCountryName === name
      ? setDisplayCountryName("")
      : setDisplayCountryName(name);
  };
  // console.log(countryDetails);
  // const filteredRegion = countries.filter(
  //   (country) => country.region === regionFilter,
  // );
  // console.log(filteredCountry);
  useEffect(() => {
    const controller = new AbortController();
    async function getCountryData() {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flag,languages,subregion,borders,currencies,flags",
          { signal: controller.signal }, //cleanup signal
        );
        if (!res.ok) throw new Error("Something went wrong with fetching data");
        const data = await res.json();
        setCountries(data);
        // console.log(data);
      } catch (err) {
        console.error(err.message);
        if (err.name !== "AbortError") setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCountryData();
    return function () {
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center gap-3 px-4 py-8 bg-cyan-100">
      <h1 className="text-4xl font-extrabold tracking-wide text-blue-700 font-heading">
        🌍 Country Explorer
      </h1>

      <p className="text-blue-500 ml-7 font-body font-medium">
        Discover countries around the world
      </p>

      <SearchBar
        search={searchCountry}
        setSearch={setSearchCountry}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />

      {/* <div>
        <p className="font-semibold text-xl p-2 text-center text-blue-600">
          🌎 {filteredCountry.length} countries found
        </p>
      </div> */}
      <CountryList
        selectedCountries={filteredCountry}
        onhandleCountryClick={handleCountryClick}
        displayCountryName={displayCountryName}
        // selectedCountries={
        //   regionFilter !== "All" ? filteredRegion : filteredCountry
        // }
      />

      {isLoading && <Loader />}

      {searchCountry && filteredCountry.length === 0 && (
        <ErrorMessage>No country matches your search criteria</ErrorMessage>
      )}

      {errorMsg && <ErrorMessage message={errorMsg} />}
    </div>
  );
}

export const CountryCard = ({
  country,
  index,
  onhandleCountryClick,
  displayCountryName,
}) => {
  const isOpen = country.name.common === displayCountryName;
  return (
    <>
      <li className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:-translate-y-1 transition">
        <div className="flex items-center gap-3 mb-4 ">
          <span className="text-sm font-bold text-blue-500 font-heading">
            #{index + 1}
          </span>
          <span className="text-3xl font-heading">{country.flag}</span>
          <span className="text-2xl font-bold font-heading text-blue-800 font-serif">
            {country.name.common}
          </span>
        </div>
        <InitialCard label="🏛️ Capital:" value={country.capital[0]} />
        <InitialCard label="🌍 Region:" value={country.region} />
        <InitialCard
          label="👥 Population:"
          value={country.population.toLocaleString("en-IN")}
        />

        <footer
          className="mt-4 border-t border-dashed pt-3 text-center font-semibold text-blue-600 cursor-pointer hover:text-blue-800"
          onClick={() => onhandleCountryClick(country.name.common)}
        >
          {!isOpen ? <p>⬇️ View More Details</p> : <p>⬆️Hide Details</p>}
        </footer>
      </li>

      <div
        className={`
    overflow-hidden
    transition-all
    ease-in-out
    duration-500
    ${isOpen ? "max-h-200 opacity-100" : "max-h-0 opacity-0"}
  `}
      >
        {<CountryDetails selectedCountry={country} />}
      </div>
    </>
  );
};

const CountryDetails = ({ selectedCountry }) => {
  if (!selectedCountry) return;
  const currenciesArray = Object.values(selectedCountry.currencies);
  const currencies = currenciesArray.map(
    (currency) => `${currency.name} (${currency.symbol})`,
  );
  const borders =
    selectedCountry.borders.length === 0 ? (
      <p className="text-xl font-semibold">None</p>
    ) : (
      selectedCountry.borders.map((border) => `[${border}]`)
    );
  return (
    <>
      <div className="w-full max-w-2xl bg-blue-50 rounded-xl p-6 shadow-inner border border-blue-200">
        <div className="grid grid-cols-2 gap-6 font-body">
          <DetailsRow label="🌎 Subregion" value={selectedCountry.subregion} />
          <DetailsRow
            label="🗣️ Languages"
            value={Object.values(selectedCountry.languages).join(", ")}
          />
          <DetailsRow label="💰 Currency" value={currencies} />

          <DetailsRow>
            <p className="font-bold font-heading text-lg text-blue-700">
              🌐 Borders
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {<span className="text-cyan-500">{borders}</span>}
            </div>
          </DetailsRow>
        </div>

        <div className="mt-6 flex justify-center mr-10">
          <img
            src={selectedCountry.flags.png}
            alt={`${selectedCountry.name.common} flag`}
            className="w-40 rounded shadow"
          />
        </div>
      </div>
    </>
  );
};
