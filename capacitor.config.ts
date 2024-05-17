import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.local.Networkers',
  appName: 'NetWorkers',
  webDir: 'dist/net-workers',
  server: {
    androidScheme: 'https'
  }
};

export default config;
