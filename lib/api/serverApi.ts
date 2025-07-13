import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

type CheckSessionResponse = {
	success: boolean;
};

export const checkSession = async () => {
	const cookieStore = await cookies();
	const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});
	return res;
};

export const getServerMe = async () => {
	const cookieStore = await cookies();
	const { data } = await nextServer.get<User>('/users/me', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	return data;
};

export async function fetchServerNoteById(id: string): Promise<Note> {
	const cookieStore = await cookies();

	const { data } = await nextServer.get<Note>(`/notes/${id}`, {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});
	return data;
}