import { OAuth2Client } from "google-auth-library";
import { AppConfig } from "../env.config.js";

export const oAuth2Client = new OAuth2Client({
  clientId: AppConfig.GOOGLE_OAUTH.CLIENT_ID,
  clientSecret: AppConfig.GOOGLE_OAUTH.CLIENT_SECRET,
  redirectUri: AppConfig.GOOGLE_OAUTH.REDIRECT_URI,
})

export const getNewAccessToken = async () => {
  const tokens = await oAuth2Client.getAccessToken()
  console.log(tokens)
}

export const getAuthorizationUrl = async () => {
  const authorizationUrl = await oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.send'
  });

  console.log("Authorization URL: ", authorizationUrl);

  return authorizationUrl;
}
