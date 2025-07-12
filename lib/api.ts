
import apiClient from "@/lib/apiClient";
import { Note } from "@/types/note";
import { NoteTag } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag: NoteTag;
}

interface SearchParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

const PER_PAGE = 12;

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> {
  const params: SearchParams = { page, perPage: PER_PAGE };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  try {
    const res = await apiClient.get<NotesResponse>("/notes", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes. Please try again later.");
  }
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note> {
  try {
    const res = await apiClient.post<Note>("/notes", {
      title,
      content,
      tag,
    });
    return res.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note. Please check your input.");
  }
}

export async function deleteNote(id: number): Promise<Note> {
  try {
    const res = await apiClient.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw new Error("Failed to delete note. It may not exist.");
  }
}

export async function fetchNoteById(id: number): Promise<Note> {
  if (isNaN(id) || id <= 0) {
    throw new Error(`Invalid ID ${id}`);
  }

  try {
    const res = await apiClient.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw new Error("Failed to fetch note details.");
  }
}
