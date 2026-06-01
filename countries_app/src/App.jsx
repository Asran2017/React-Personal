// import { countries } from "./data/countries";
import { useEffect, useState } from "react";
export default function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const filteredCountry = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase()) &&
      (country.region === regionFilter || regionFilter === "All"),
  );
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
          "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flag",
          { signal: controller.signal() }, //cleanup signal
        );
        if (!res.ok) throw new Error("Something went wrong with fetching data");
        const data = await res.json();
        setCountries(data);
        console.log(data);
      } catch (err) {
        console.error(err.message);
        setErrorMsg(err.message);
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
      <h1 className="text-4xl font-extrabold tracking-wide text-blue-700">
        🌍 Country Explorer
      </h1>

      <p className="text-blue-500 ml-7  font-medium">
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

const SearchBar = ({ search, setSearch, regionFilter, setRegionFilter }) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-2 items-center w-full"
    >
      <label
        htmlFor="search"
        className="mt-3 font-semibold text-md text-blue-700"
      >
        🔍 Search Country
      </label>
      <input
        type="text"
        placeholder="Type country name and select region"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl border-2 w-full max-w-md px-4 py-3 border-blue-300 bg-white shadow-md focus:outline-none focus:ring-blue-200 focus:border-blue-500 transition"
      />
      <label
        htmlFor="region"
        className="mt-3 font-semibold text-md text-blue-700"
      >
        Select Region
      </label>
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="rounded-lg border-2  px-2 py-2 border-blue-300 bg-white shadow-md focus:outline-none focus:ring-blue-200 focus:border-blue-500 transition"
      >
        <option value="All">All</option>
        <option value="Asia">Asia</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>

        <option value="Oceania">Oceania</option>
      </select>
    </form>
  );
};
const CountryList = ({ selectedCountries }) => {
  return (
    <>
      <div>
        {" "}
        {selectedCountries.length > 1 ? (
          <p className="font-semibold text-xl p-2 text-center text-blue-600">
            🌎 {selectedCountries.length} countries found
          </p>
        ) : (
          <p className="font-semibold text-xl p-2 text-center text-blue-600">
            🌎 {selectedCountries.length} country found
          </p>
        )}
      </div>
      <ul className="flex flex-col gap-3 mt-4 mb-4">
        {selectedCountries.map((country, index) => (
          <CountryCard
            country={country}
            key={country.name.common}
            index={index}
          />
        ))}
      </ul>
    </>
  );
};

const CountryCard = ({ country, index }) => {
  return (
    <li className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-5  hover:shadow-xl hover:-translate-y-1 transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-bold text-blue-500">#{index + 1}</span>
        <span className="text-3xl">{country.flag}</span>
        <span className="text-2xl font-bold text-blue-800 font-serif">
          {country.name.common}
        </span>
      </div>
      <div>
        <p>
          🏛️ <span className="font-semibold "> Capital:</span>
          {country.capital[0]}
        </p>
      </div>
      <div>
        <p>
          🌍 <span className="font-semibold">Region:</span>
          {country.region}
        </p>
      </div>
      <div>
        <p>
          👥 <span className="font-semibold">Population:</span>
          {country.population.toLocaleString("en-IN")}
        </p>
      </div>
    </li>
  );
};

const Loader = () => {
  return (
    <div className="mt-6 bg-white px-6 py-3 rounded-xl shadow-md">
      <p className="text-blue-700 font-semibold text-lg">
        ⏳ Loading countries....
      </p>
    </div>
  );
};

const ErrorMessage = ({ message, children }) => {
  return (
    <div className="mt-4 bg-red-200 border border-red-300 px-6 py-3 rounded-xl shadow-md">
      <p className="text-lg font-bold text-red-600 text-center">
        ⚠️ {message || children}
      </p>
    </div>
  );
};
