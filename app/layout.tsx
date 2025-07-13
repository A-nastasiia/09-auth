import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
	weight: ['400', '700'],
	variable: '--font-main',
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
	title: 'NoteHUB',
	description:
		'A simple and fast notes app to create, edit, and manage your personal or work-related notes. Organize your thoughts in one place — anytime, anywhere.',
	openGraph: {
		title: 'NoteHUB',
		description:
			'A simple and fast notes app to create, edit, and manage your personal or work-related notes. Organize your thoughts in one place — anytime, anywhere.',
		url: 'https://08-zustand-nine.vercel.app/',
		images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
	},
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable}>
				<TanStackProvider>
					<AuthProvider>
						<Header />
						{children}
						{modal}
						<Footer />
					</AuthProvider>
				</TanStackProvider>
			</body>
		</html>
	);
}
