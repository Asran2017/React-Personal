import { CountryCard } from "../App.jsx";
export const CountryList = ({
  selectedCountries,
  onhandleCountryClick,
  displayCountryName,
}) => {
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
            onhandleCountryClick={onhandleCountryClick}
            displayCountryName={displayCountryName}
          />
        ))}
      </ul>
    </>
  );
};
