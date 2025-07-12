import { Metadata } from 'next';
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata:Metadata = {
  title: "Create a note | NoteHub",
  description: "Create a new note and save it to NoteHub",
  openGraph: {
    title: "Create a note | NoteHub",
    description: "Create a new note and save it to NoteHub",
    url: "https://08-zustand-nine.vercel.app//notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
