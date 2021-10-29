import { IDBUser, IUser } from '@fridgespy/types';

export const formatDBUserToUser = (dbUser: IDBUser): IUser => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    createdAt: dbUser.created_at || '',
    updatedAt: dbUser.updated_at || '',
    avatarUrl: dbUser.avatar_url,
    displayName: dbUser.display_name,
    metaData: dbUser.meta_data,
  };
};
