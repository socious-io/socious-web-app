import {DeviceBody, DeviceToken} from '@models/devices';
import {get, post} from 'utils/request';

export function getDevices() {
  return get<Array<DeviceToken>>('/devices');
}

export function saveDeviceToken(deviceBody: DeviceBody) {
  return post<DeviceToken>('/devices', deviceBody);
}
