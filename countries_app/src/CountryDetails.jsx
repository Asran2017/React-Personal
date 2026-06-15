import { DetailsRow } from "./UI_Comps/DetailsRow";

export const CountryDetails = ({ selectedCountry }) => {
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
              {<span className="text-cyan-500 font-semibold">{borders}</span>}
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
