import { config } from '@/configs';

import type { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  async origin(requestOrigin, callback) {
    if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
      return;
    }

    if (config.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }

    callback(new Error('not allow CORS'));
  },

  credentials: true,
};
