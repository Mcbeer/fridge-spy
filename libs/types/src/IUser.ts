export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  displayName?: string;
  metaData?: Record<string, unknown>;
}

export interface IDBUser {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
  display_name?: string;
  meta_data?: Record<string, unknown>;
}

export interface IUpdateDBUser {
  email?: string;
  password?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
  display_name?: string;
  meta_data?: Record<string, unknown>;
}
