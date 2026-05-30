import { useEffect, useState } from "react";
import { useNotes } from "./useNotes.jsx";
export default function App() {
  const {
    notesArray,
    setNotesArray,
    editNote,
    setEditNote,
    handleDelete,
    searchNotes,
    setsearchNotes,
    filteredNotes,
    successMsg,
    showSuccess,
  } = useNotes();

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-[350px_1fr] gap-6">
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 font-semibold text-center shadow-md">
            {successMsg}
          </div>
        )}
        <Card>
          <NoteForm
            showSuccess={showSuccess}
            setNoteArray={setNotesArray}
            noteArray={notesArray}
            editNote={editNote}
            setEditNote={setEditNote}
          />
        </Card>

        <Card>
          <SearchBar
            searchNotes={searchNotes}
            setsearchNotes={setsearchNotes}
          />
          <NotesList
            displayedNotes={searchNotes ? filteredNotes : notesArray}
            onHandleDelete={handleDelete}
            setEditNote={setEditNote}
          />
        </Card>
      </div>
    </div>
  );
}

const NoteForm = ({
  setNoteArray,
  noteArray,
  editNote,
  setEditNote,
  showSuccess,
}) => {
  const [notesInput, setNotesInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [inputsErrorMessage, setInputsErrorMessage] = useState(false);
  const addNote = (e) => {
    e.preventDefault();
    if (editNote) {
      setNoteArray((currNote) =>
        currNote.map((note) =>
          note.id === editNote.id
            ? { ...note, title: titleInput, content: notesInput }
            : note,
        ),
      );
      showSuccess("Note updated");
      setNotesInput("");
      setTitleInput("");
      setEditNote("");
      // handleReset();
      return;
    }
    if (!notesInput || !titleInput) {
      setInputsErrorMessage(true);
      return;
    }
    const newNote = { title: titleInput, content: notesInput, id: Date.now() };
    if (noteArray.some((elt) => elt.content === newNote.content)) {
      setErrorMessage(true);
      return false;
    }
    setNoteArray((currNote) => [...currNote, newNote]);
    showSuccess("Note Added Successfully");
    setNotesInput("");
    setTitleInput("");
    setInputsErrorMessage(false);
    setErrorMessage(false);
    return true;
  };
  //Editing Note

  useEffect(
    function () {
      if (!editNote) return;
      // eslint-disable-next-line
      setNotesInput(editNote.content);
      setTitleInput(editNote.title);
    },
    [editNote],
  );
  const handleReset = () => {
    setNotesInput("");
    setTitleInput("");
  };

  return (
    <div>
      <form onSubmit={addNote} className="flex flex-col gap-4">
        <label htmlFor="title" className="text-sm font-semibold text-slate-800">
          Enter Title:
        </label>
        <input
          className="w-full rounded-xl border border-slate-400 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <label htmlFor="note" className="text-sm font-semibold text-slate-800">
          Enter Note:
        </label>
        <input
          className="w-full rounded-xl border border-slate-400 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        />
        <div>
          {inputsErrorMessage && (
            <ErrorMessage>Kindly fill both the fields!</ErrorMessage>
          )}
        </div>
        <div className="flex gap-3 mt-2">
          {editNote ? (
            <button
              type="submit"
              className="border border-green-300 bg-green-600 text-white py-3 px-2 rounded-xl font-semibold hover:bg-green-700 transition-all"
            >
              Save Edit
            </button>
          ) : (
            <button
              type="submit"
              className="border border-indigo-300 bg-indigo-600 text-white py-3 px-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
            >
              Add
            </button>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="border  border-red-300 py-3 px-2 rounded-xl font-semibold text-white bg-red-600 hover:bg-slate-100 transition-all"
          >
            Reset
          </button>
        </div>
        {errorMessage && (
          <ErrorMessage>
            This note already exists!You can edit the note if you want.
          </ErrorMessage>
        )}
      </form>
    </div>
  );
};

const NotesList = ({ displayedNotes, onHandleDelete, setEditNote }) => {
  return (
    <>
      <ul className="flex flex-col gap-2 mb-4 mt-4">
        {displayedNotes.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p className="text-lg font-semibold">No notes yet 📝</p>
            <p className="text-sm">Start by adding your first note</p>
          </div>
        ) : (
          displayedNotes.map((note, index) => (
            <NoteItem
              key={note.id}
              note={note}
              index={index}
              onHandleDelete={onHandleDelete}
              setEditNote={setEditNote}
            />
          ))
        )}
      </ul>
    </>
  );
};
const NoteItem = ({ note, index, onHandleDelete, setEditNote }) => {
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
const ErrorMessage = ({ children }) => {
  return (
    <div>
      <p className="font-bold text-lg text-indigo-700 text-center">
        {children}
      </p>
    </div>
  );
};
const Card = ({ children }) => {
  return <div className="bg-white rounded-3xl shadow-lg p-6">{children}</div>;
};
const SearchBar = ({ searchNotes, setsearchNotes }) => {
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
