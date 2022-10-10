export type IdentityMeta = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  username?: string;
  shortname?: string;
  image?: string;
};

export type IdentityType = 'users' | 'organizations';

export type OtherIdentityMeta = {
  id: string;
  type?: IdentityType;
  meta?: IdentityMeta;
  created_at?: string;
  following?: boolean;
  follower?: boolean;
};

export type LoginIdentity = {
  id: string;
  type?: IdentityType;
  meta?: IdentityMeta;
  created_at?: string;
  primary?: boolean;
  current?: boolean;
};
