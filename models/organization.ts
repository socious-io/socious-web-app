export interface IOrganizationUserType {
  id: number;
  first_name: string;
  last_name?: string;
  location: string;
  username?: string;
  email?: string;
  img: string;
  requested: boolean;
}

// FIXME should come from socious-data
declare type TIdentity = 'organizations' | 'users';

export interface IOrganizationFollowerType {
  identity_type: TIdentity;
  identity_meta: {
    avatar: string | null;
    email: string;
    id: string;
    name: string;
    status: string;
    username: string;
  };
}

export interface GlobalResponseType<T> {
  items: T[];
  limit: number;
  page: number;
  total_count: number;
}
