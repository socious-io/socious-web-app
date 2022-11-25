export type IdentityMeta = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  username?: string;
  shortname?: string;
  image?: string;
  status?: IdentityStatus;
};

export type MetaWithAddress = IdentityMeta & {
  address?: string;
  city?: string;
  country?: string;
};

export type IdentityType = 'users' | 'organizations';

export type OtherIdentityMeta<T = IdentityMeta> = {
  id: string;
  type: IdentityType;
  meta: T;
  created_at: string;
  following: boolean;
  follower: boolean;
};

export type LoginIdentity = {
  id: string;
  type?: IdentityType;
  meta?: IdentityMeta;
  created_at?: string;
  primary?: boolean;
  current?: boolean;
};

export type IdentityStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPEND';
