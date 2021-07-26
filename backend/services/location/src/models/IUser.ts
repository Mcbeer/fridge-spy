export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDBUser {
  id: string;
  name: string;
  email: string;
  password: string; // Will always be hashed, so yeah...
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
