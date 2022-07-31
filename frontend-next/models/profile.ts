// import {BusinessProfile} from './business';
import {City} from './city';
import {Country} from './country';
import {MobileCountry} from './mobileCountry';
// import {NewsFeed} from './newsFeed';
import {Passion} from './passion';
import {TopSkills} from './topSkills';

export interface UserProfile {
  profile: any;
  id: number;
  active?: boolean;
  first_name?: string;
  last_name?: string;
  followers: number;
  bio?: string;
  email_text?: string;
  /**
   * 0: User
   * 1: Business
   */
  view_as?: 0 | 1;
  language?: string;
  phone?: string;
  my_conversation?: string;
  location?: string;
  address_detail?: string;
  city?: City;
  city_ja?: City;
  latitude?: number;
  longitude?: number;
  country?: Country;
  mobile_countries?: MobileCountry;
  avatar?: string;
  cover_image?: string;
  mission?: string;
  profile_id?: string;
  passions?: Array<Passion>;
  posts?: Array<any>;
  experiences?: Array<any>;
  skills?: Array<TopSkills>;
  initiatives_followed?: Array<any>;
  business?: any;
  /**
   * other profile follow you or not
   */
  check_follower?: boolean;

  /**
   * you follow other profile or not
   */
  check_following?: boolean;

  is_blocker?: boolean;
}
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
  city?: City;
  city_ja?: City;
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