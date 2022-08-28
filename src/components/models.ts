export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface UserData {
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}
