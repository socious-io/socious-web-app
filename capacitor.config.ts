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
  android: {
    allowMixedContent: true,
  },
  server: {
    hostname: 'socious.io',
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['https://socious.io/api/v2/*'],
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    // CapacitorCookies: {
    //   enabled: true,
    // },
  },
};

export default config;
