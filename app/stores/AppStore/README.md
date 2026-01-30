````md
# Notes State Management (Zustand + MMKV)

This project uses **Zustand** for in-memory state and **MMKV** for persistent storage to manage a list of notes.  
It supports adding, editing, deleting, and resetting notes.

---

## What is stored

Each note looks like this:

```ts
type NoteItem = {
  id: string;
  note_category?: { label: string; value: string };
  note_content?: string | null;
  created_at: number;
  updated_at: number;
};
```
````

All notes are saved to MMKV under a single key and load on app start.

---

## Getting started

At app startup (e.g. `App.tsx`):

```ts
const initAppState = useAppStore((s) => s.actions.initAppState);

useEffect(() => {
  initAppState();
}, []);
```

This loads saved notes from MMKV into Zustand.

---

## Accessing the store

```ts
const notes = useAppStore((s) => s.data.notes);
const { addNote, updateNote, deleteNote, resetNotes } = useAppStore((s) => s.actions);
```

---

## Add a note

```ts
const id = addNote({
  note_content: 'hello',
  note_category: { label: 'Work', value: 'work' },
});
```

Returns the generated `noteId`.

---

## Update a note

```ts
updateNote(id, {
  note_content: 'edited',
});
```

You can update `note_content` and/or `note_category`.

---

## Delete a note

```ts
deleteNote(id);
```

Removes the note from state and MMKV.

---

## Delete all notes

```ts
resetNotes();
```

Clears all notes from Zustand and MMKV.

---

## Change app language

```ts
setLanguage('cn');
```

Change app current langueage

---
