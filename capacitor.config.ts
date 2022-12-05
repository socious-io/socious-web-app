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
    // capacitor.native
    hostname: 'socious.io',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    CapacitorHttp: {
      enabled: true,
    },
    // CapacitorCookies: {
    //   enabled: true,
    // },
  },
};

export default config;
