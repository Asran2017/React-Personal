export const NoteItem = ({ note, index, onHandleDelete, setEditNote }) => {
  return (
    <>
      <li className="bg-white border border-slate-300 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col gap-4">
        <div className="flex gap-3">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <span className="text-lg font-bold text-slate-700">{note.title}</span>
        </div>

        <div>
          <p className="font-semibold  text-slate-700 ">{note.content}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditNote(note)}
            className="text-blue-500 text-sm px-2 py-1 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onHandleDelete(note.id)}
            className="text-red-500 text-sm px-2 py-1 bg-red-100 rounded-lg transition hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};
