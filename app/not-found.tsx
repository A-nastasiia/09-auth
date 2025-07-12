import { Metadata } from 'next';
import css from "./Home.module.css";
import Link from "next/link";

export const metadata:Metadata = {
  title: "404 — Page Not Found | NoteHub",
  description:
    "Unfortunately, this page does not exist. Please return to the NoteHub.",
  openGraph: {
    title: "404 — Page Not Found | NoteHub",
    description:
      "Unfortunately, this page does not exist. Please return to the NoteHub.",
    url: "https://08-zustand-nine.vercel.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
