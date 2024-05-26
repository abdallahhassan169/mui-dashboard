import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'gov.eg.DASH.app',
  appName: 'DASH',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
