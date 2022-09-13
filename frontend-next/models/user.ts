export type UpdateProfileBodyType = {
  first_name: string;
  last_name: string;	
  username: string;
  bio?: string;
  city?: string;
  avatar?: string;	
  cover_image?: string;
  address?: string;	
  wallet_address?: string;	
  social_causes:	string[];
  skills: string[];
}