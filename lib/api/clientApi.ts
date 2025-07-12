import { api } from "@/app/api/api";
import { LogInUser, User } from "@/types/user";
import { nextServer } from "./api";

type CheckSessionResponse = {
	success: boolean;
};

export async function register(data: User) {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: User) {
  const response = await api.post<LogInUser>("/auth/login", data);
  return response.data;
}

export const checkSession = async () => {
	const res = await nextServer.get<CheckSessionResponse>('/auth/session');
	return res.data.success;
};

export const getMe = async () => {
	const { data } = await nextServer.get<User>('/users/me');
	return data;
};