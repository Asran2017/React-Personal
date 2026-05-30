import { Card } from "./UI_Components/Card.jsx";
import { useNotes } from "./Hooks/useNotes.jsx";
import { NoteForm } from "./NoteForm.jsx";
import { NotesList } from "./NotesList.jsx";
import { SearchBar } from "./UI_Components/SearchBar.jsx";
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
    <>
      {successMsg && (
        <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 font-lg font-semibold text-center shadow-md">
          <p>{successMsg}</p>
        </div>
      )}
      <div className="min-h-screen bg-slate-300 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-[350px_1fr] gap-6">
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
    </>
  );
}
