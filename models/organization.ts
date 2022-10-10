import {IdentityMeta, IdentityType} from './identity';

export interface IOrganizationUserType {
  id: string;
  first_name: string;
  last_name?: string;
  location: string;
  username?: string;
  email?: string;
  avatar: IAvatarInfo | null;
  requested: boolean;
}

interface IAvatarInfo {
  url: string;
}

export interface IOrganizationFollowerType {
  identity_type: IdentityType;
  identity_meta: IdentityMeta;
}

export interface GlobalResponseType<T> {
  items: T[];
  limit: number;
  page: number;
  total_count: number;
}
