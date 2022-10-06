export interface NotificationItem {
  id: string;
  type:
    | 'FOLLOWED'
    | 'COMMENT_LIKE'
    | 'POST_LIKE'
    | 'CHAT'
    | 'SHARE_POST'
    | 'SHARE_PROJECT'
    | 'COMMENT'
    | 'APPLICATION';
  ref_id: string;
  user_id: string;
  data: {
    body: {
      body: string;
      title: string;
    };
    consolidate_number: number;
    type:
      | 'FOLLOWED'
      | 'COMMENT_LIKE'
      | 'POST_LIKE'
      | 'CHAT'
      | 'SHARE_POST'
      | 'SHARE_PROJECT'
      | 'COMMENT'
      | 'APPLICATION';

    refId: string;
    identity: {
      id: string;
      meta: {
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        username: string;
      };
      type: 'users' | 'organizations';
      follower: boolean;
      following: boolean;
      created_at: string | null;
    };
  };
  view_at: string | null;
  read_at: string | null;
  updated_at: string | null;
  created_at: string | null;
}

export interface NotificationFeed {
  page: number;
  limit: number;
  total_count: number;
  items: NotificationItem;
}
