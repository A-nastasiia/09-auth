#### # 📝 NoteHub

NoteHub is a multi-page application for creating, viewing, and managing notes. Built using **Next.js App Router**, **TypeScript**, **React Query (TanStack)**, **Axios**, and **CSS Modules**.

![NoteHub Screenshot](https://github.com/Ded-Goit/06-notehub-nextjs/blob/main/public/note_hub.png)

## 🚀 Features

- 🔍 Search & Filter: Find notes by keyword or category
- 🧩 Parallel Routes: Sidebar and modal previews with separate data streams
- 🎛️ Route Interception: Open note details in a modal without full page reload
- 🗂️ Logical Grouping: (public) and (private) routes without affecting URLs
- ➕ Create, Edit, Delete: Full CRUD for notes
- 📝 Standalone Create Page: Dedicated `/notes/action/create` page for note creation
- 🗂️ Draft Saving: Auto-save your note draft while typing (Zustand + localStorage)
- 🔒 Persistent Drafts: Resume your note later — even after closing the tab
- 🧠 SSR & CSR: Mix of server- and client-side rendering for best performance
- ⚡ Data Caching: Powered by TanStack Query
- 📈 Improved SEO: Dynamic metadata & Open Graph tags for better visibility
- 🎨 Styled with CSS Modules: Clean, modular styling
- ⏳ Loading Indicators: Uses React Spinners for smooth UX

## 🗂 Project structure

           08-zustand/
           ├── 📁app/         # App Router: routing, pages, layout, loading/error
           ├── 📁components/  # All UI components
           ├── 📁lib/         # API logic
           ├── 📁public/      # Static files (favicon, images, screenshots)
           ├── 📁types/       # Common TypeScript types (Note interfaces, etc.)
           ├── 📄.gitignore        # List files/folders that Git ignores
           ├── 📄.prettierrс       # Prettier configuration
           ├── 📄README.md         # Project documentation and setup instructions.
           ├── 📄eslint.config.mjs # ESLint configuration for code quality checking
           ├── 📄next.config.ts    # Next.js configuration
           ├── 📄package-lock.json # Automatically generated dependency file
           ├── 📄package.json      # Main dependency, script, and project description file
           └── 📄tsconfig.json     # Configuration for TypeScript compiler

## 💡 How Drafts Work

NoteHub uses [Zustand](https://github.com/pmndrs/zustand) with the `persist` middleware to store your note draft in `localStorage`. This means:

- Your unsaved work is always safe
- The draft is loaded automatically when you revisit `/notes/action/create`
- The draft is cleared automatically when you successfully create a note

## ⚙️ Technologies

- [Next.js 15+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Zustand + Persist](https://github.com/pmndrs/zustand)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Spinners](https://www.davidhu.io/react-spinners/)

## 📦 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

📄 License
This project is licensed under the MIT License.
