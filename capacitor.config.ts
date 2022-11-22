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
    //   // url: 'http://192.168.1.4:3000',
    //   // cleartext: true,
    // hostname: 'capacitor',
    // hostname: 'android',
    // androidScheme: 'native',
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
