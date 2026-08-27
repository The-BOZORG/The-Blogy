import { config } from '@/configs';

import type { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(
        config.NODE_ENV === 'development' ? null : new Error('not allow CORS'),
      );
    }
  },
  credentials: true,
};
