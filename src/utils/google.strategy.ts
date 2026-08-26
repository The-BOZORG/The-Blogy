import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

import { config } from '@/configs';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false);
        }

        const user = {
          googleId: profile.id,
          email,
          username: profile.displayName,
        };

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
