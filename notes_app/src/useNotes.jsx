import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage.jsx";

export const useNotes = () => {
  const [notesArray, setNotesArray] = useLocalStorage([], "notesList");
  const [searchNotes, setsearchNotes] = useState("");
  const [editNote, setEditNote] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleDelete = (id) => {
    setNotesArray((currArr) => currArr.filter((elt) => elt.id !== id));
  };
  const filteredNotes = notesArray.filter((note) =>
    note.title.toLowerCase().includes(searchNotes.toLowerCase()),
  );
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 2500);
  };
  return {
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
  };
};
