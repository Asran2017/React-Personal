import { useState, useEffect } from "react";
import { ErrorMessage } from "../UI_Components/ErrorMessage.jsx";

export const NoteForm = ({
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
    console.log("entered add function");
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
