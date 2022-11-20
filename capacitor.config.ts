import {Capacitor} from '@capacitor/core';
import {CapacitorConfig} from '@capacitor/cli';
import {hostname} from 'os';

const defineHostname = (): 'socious.io' | 'localhost' => {
  return Capacitor.getPlatform() === 'android' ? 'localhost' : 'socious.io';
};

console.log('hostname: ', hostname());

const config: CapacitorConfig = {
  // appId: 'jp.socious.network',
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    hostname: 'localhost',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    FirebaseMessaging: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
