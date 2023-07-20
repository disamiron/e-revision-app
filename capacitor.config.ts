import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'E-revision',
  webDir: 'docs',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  },
};

export default config;
