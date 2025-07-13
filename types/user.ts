export interface User {
  email: string;
  password: string;
  avatar: string;
  username: string;
}

export interface LogInUser {
  username: string;
  email: string;
  avatar?: string;
}
