export const SearchBar = ({
  search,
  setSearch,
  regionFilter,
  setRegionFilter,
}) => {
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
