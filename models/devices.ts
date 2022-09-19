interface DeviceMeta {
  app_version?: string;
  os: string;
  os_version?: string;
}
export interface DeviceToken {
  id: string;
  user_id: string;
  token: string;
  meta: DeviceMeta | null;
  created_at: string;
}

export interface DeviceBody {
  token: string;
  meta: DeviceMeta;
}
