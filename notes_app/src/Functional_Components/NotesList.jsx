import { NoteItem } from "./NoteItem";

export const NotesList = ({ displayedNotes, onHandleDelete, setEditNote }) => {
  return (
    <>
      <ul className="flex flex-col gap-2 mb-4 mt-4">
        {displayedNotes.length === 0 ? (
          <div className="text-center py-10 text-slate-700">
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
