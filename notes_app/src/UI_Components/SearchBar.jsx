export const SearchBar = ({ searchNotes, setsearchNotes }) => {
  return (
    <form>
      <label htmlFor="search" className="text-sm font-semibold text-slate-800">
        Search Notes:
      </label>
      <input
        value={searchNotes}
        onChange={(e) => setsearchNotes(e.target.value)}
        type="text"
        className="w-full border border-slate-400 px-2 py-2 outline-none focus:ring-2 rounded-md focus:ring-indigo-500"
        placeholder="Enter title"
      />
    </form>
  );
};
