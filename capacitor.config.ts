import {Capacitor} from '@capacitor/core';
import {CapacitorConfig} from '@capacitor/cli';

const defineHostname = (): 'socious.io' | 'localhost' => {
  return Capacitor.getPlatform() === 'android' ? 'localhost' : 'socious.io';
};

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    hostname: defineHostname(),
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
