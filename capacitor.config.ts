import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'out',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
  // server: {
  //   url: 'http://192.168.1.3:3000',
  //   cleartext: true,
  // },
};

export default config;
