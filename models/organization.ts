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
  image?: IAvatarInfo;
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

export type TMediaType = {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: string;
};

export interface IOrganization {
  address: string;
  bio: string;
  city: string;
  country: string;
  cover_image: TMediaType | null;
  created_at: string;
  created_by: string;
  culture: string;
  description: string;
  email: string;
  followers: number;
  followings: number;
  id: string;
  image: TMediaType | null;
  impact_score: 0;
  mission: string;
  mobile_country_code: string;
  name: string;
  old_id: string;
  phone: string;
  search_tsv: string;
  shortname: string;
  social_causes: string[];
  status: string;
  type: string;
  updated_at: string;
  wallet_address: string;
  website: string;
}

export interface GlobalResponseType<T> {
  items: T[];
  limit: number;
  page: number;
  total_count: number;
}
