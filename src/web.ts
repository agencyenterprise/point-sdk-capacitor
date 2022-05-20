import { WebPlugin } from '@capacitor/core';

import type { PointSDKPlugin } from './definitions';

export class PointSDKWeb extends WebPlugin implements PointSDKPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
