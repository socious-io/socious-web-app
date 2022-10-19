import {IdentityType} from './identity';

type TNotificationTypes =
  | 'FOLLOWED'
  | 'COMMENT_LIKE'
  | 'POST_LIKE'
  | 'CHAT'
  | 'SHARE_POST'
  | 'SHARE_PROJECT'
  | 'COMMENT'
  | 'APPLICATION';

export interface NotificationItem {
  id: string;
  type: TNotificationTypes;
  ref_id: string;
  user_id: string;
  data: {
    body: {
      body: string;
      title: string;
    };
    parentId: string;
    consolidate_number: number;
    type: TNotificationTypes;

    refId: string;
    identity: {
      id: string;
      meta: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
        username?: string;
        shortname?: string;
        image?: string | null;
      };
      type: IdentityType;
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

export interface PushNotificationBody {
  data: {
    identity: string;
    refId: string;
    type: TNotificationTypes;
    parentId?: string;
  };
  from: string;
  priority: string;
  notification: {
    title: string;
    body: string;
  };
  fcmMessageId: string;
  isFirebaseMessaging: boolean;
  messageType: string;
}
