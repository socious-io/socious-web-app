// import {BusinessProfile} from './business';
// import {NewsFeed} from './newsFeed';

import {TMediaType} from './media';

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  followers: number;
  bio?: string;
  email?: string;
  language?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  geoname_id?: number | null;
  mobile_country_code?: string;
  avatar?: TMediaType;
  cover_image?: TMediaType;
  mission?: string;
  social_causes: Array<string>;
  skills: Array<string>;
  impact_score: number;
  followings: number;
  created_at: string;
  languages?: string | string[];
  experiences?: string;
  password_expired?: boolean;
}

export type TUserByUsername = {
  avatar: TMediaType | null;
  bio: string | null;
  cover_image: null;
  created_at: string;
  first_name: string;
  followers: number;
  followings: number;
  id: string;
  impact_score: number;
  last_name: number;
  mission?: string;
  skills: Array<string>;
  social_causes: Array<string>;
  username: string;
};
export interface UserProfileBody {
  first_name?: string;
  last_name?: string;
  email_text?: string;
  bio?: string;
  location?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  mission?: string;
  passions?: Array<number>;
  mobile_countries_id?: number;
  city?: string;
  country_id?: string;
  country_id_ja?: string;
  address_detail?: string;
  description_search?: string;
  description_search_ja?: string;
}

export interface FollowEvent {
  profileId: number;
  followState: boolean;
}

export interface MapsPrediction {
  place_id: string;
  description: string;
  structured_formatting: MapsResponseFormat;
  terms: Array<TermsPlace>;
  types: Array<string>;
}

export interface MapsResponseFormat {
  main_text: string;
  main_text_matched_substrings?: Array<TermsPlace>;
  secondary_text?: string;
}

export interface PlaceDetail {
  address_components: Array<AddressComponent>;
  formatted_address: string;
  place_id: string;
  name: string;
}

export interface AddressComponent {
  long_name?: string;
  short_name?: string;
  types?: Array<string>;
}

export interface MapsResponse {
  predictions: Array<MapsPrediction>;
}

export interface PlaceDetailResponse {
  result: PlaceDetail;
}

export interface TermsPlace {
  offset: number;
  value: string;
}

export interface IUpdateProfileBody {
  social_causes: string[];
  bio: string;
  country: string;
  city: string;
  geoname_id: number | null;
  address?: string;
  mission?: string;
  mobile_country_code?: string;
  phone?: string;
  cover_image?: string;
  avatar?: string;
  image?: string;
}
export interface IUpdateUserBody extends IUpdateProfileBody {
  first_name: string;
  last_name: string;
  username: string;
  skills: string[];
}

export interface IUpdateOrgBody extends IUpdateProfileBody {
  name: string;
  type: string;
  email: string;
  website?: string;
  culture?: string;
}
