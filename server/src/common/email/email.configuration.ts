import * as process from 'node:process';

export interface EmailConfiguration {
  emailUser: string;
  googleOAuthClientId: string;
  googleOAuthClientSecret: string;
  googleOAuthRefreshToken: string;
}

export default (): { email: EmailConfiguration } => ({
  email: {
    emailUser: process.env.EMAIL_USER,
    googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    googleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    googleOAuthRefreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  },
});
