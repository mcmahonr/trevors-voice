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

export interface Pec {
  id: string; // UUIDv4 value
  user: string; // The user that created this Pec
  imageUri: string; // A URL pointing at the image
  soundUri: string; // A URL pointing at the sound file
  children: Array<string>; // A List of Pec Ids that are to be considered children of this Pec
}

export interface PecBoard {
  id: string; // UUIDv4 value
  user: string; // The user that this pec board belongs to
  pecs: Array<Pec>; // The PeCs that belong on this board
}
