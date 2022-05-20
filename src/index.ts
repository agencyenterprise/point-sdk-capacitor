import { registerPlugin } from '@capacitor/core';

import type { PointSDKPlugin } from './definitions';

const PointSDK = registerPlugin<PointSDKPlugin>('PointSDK', {
  web: () => import('./web').then(m => new m.PointSDKWeb()),
});

export * from './definitions';
export { PointSDK };
