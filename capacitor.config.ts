import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    // TODO: this should only be applied to iOS
    hostname: 'dev.socious.io',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
