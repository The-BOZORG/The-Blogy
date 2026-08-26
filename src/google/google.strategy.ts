import passport from 'passport';
import { Strategy, Profile } from 'passport-google-oauth20';

import { config } from '@/configs';

export default passport.use(
  new Strategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    },

    (accessToken: string, refreshToken: string, profile: Profile, done) => {
      const { id, displayName, emails } = profile;

      const user = {
        googleId: id,
        username: displayName,
        email: emails?.[0]?.value,
        accessToken,
      };

      done(null, user);
      console.log('GOOGLE CALLBACK:', config.GOOGLE_CALLBACK_URL);
    },
  ),
);
