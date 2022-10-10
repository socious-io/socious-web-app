import {IdentityMeta, IdentityType} from './identity';

export interface IOrganizationType {
  id: string;
  name?: string;
  bio?: string;
  description?: string;
  email?: string;
  phone?: string;
  city?: string;
  type?: string;
  address?: string;
  website?: string;
  created_at: string;
  updated_at?: string;
  social_causes?: string[];
  followers?: number;
  followings?: number;
  country?: string;
  wallet_address?: string;
  impact_score: number;
  mission?: string;
  culture?: string;
  image?: string;
  cover_image?: string;
  mobile_country_code?: string;
  created_by?: string;
  shortname: string;
}

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
