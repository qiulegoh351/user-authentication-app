import { AppState, NoteItem, NoteListing } from '@app/@types';
import { STORAGE_KEY } from '@app/config/constant';
import { mmkvStorage } from '@app/utils/mmkv';
import { load, save, remove } from '@app/utils/storage';
import { create } from 'zustand';

const now = () => Date.now();
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useAppStore = create<AppState>((set, get) => ({
  data: {
    notes: [],
    language: 'en-US',
  },

  actions: {
    // Load persisted notes from MMKV into memory on app start
    initAppState: () => {
      const stored = load<NoteListing>(STORAGE_KEY.NOTES);
      const language = mmkvStorage.getLanguage();
      if (Array.isArray(stored)) {
        set((state) => ({
          ...state,
          data: { ...state.data, notes: stored, language: language ?? 'en-US' },
        }));
      }
    },

    // Get note detail by id
    getNoteDetail: (id: string) => {
      return get().data.notes.find((note) => note.id === id) ?? null;
    },

    // Create a new note, add it to the list, and persist to storage
    addNote: (payload) => {
      const id = uid();
      const item: NoteItem = {
        id,
        note_category: payload.note_category,
        note_content: payload.note_content ?? null,
        created_at: now(),
        updated_at: now(),
      };

      set((state) => {
        const notes = [item, ...state.data.notes]; // newest first
        save(STORAGE_KEY.NOTES, notes);
        return { ...state, data: { ...state.data, notes } };
      });

      return id;
    },

    // Update an existing note by id and save changes to storage
    updateNote: (id, patch) => {
      set((state) => {
        const notes = state.data.notes.map((note) =>
          note.id === id
            ? {
                ...note,
                ...patch,
                updated_at: now(),
              }
            : note,
        );
        save(STORAGE_KEY.NOTES, notes);
        return { ...state, data: { ...state.data, notes } };
      });
    },

    // Remove a note from the list and persist the updated list
    deleteNote: (id) => {
      set((state) => {
        const notes = state.data.notes.filter((note) => note.id !== id);
        save(STORAGE_KEY.NOTES, notes);
        return { ...state, data: { ...state.data, notes } };
      });
    },

    // Clear all notes from memory and MMKV storage
    resetNotes: () => {
      remove(STORAGE_KEY.NOTES);
      set((state) => ({ ...state, data: { ...state.data, notes: [] } }));
    },

    // Set app language
    setLanguage: (language) => {
      mmkvStorage.setLanguage(language);
      set((state) => ({ ...state, data: { ...state.data, language } }));
    },
  },
}));

export default useAppStore;
