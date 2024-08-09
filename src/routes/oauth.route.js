import { Router } from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { oAuth2Client } from "../utils/oauth.util.js";
import { getAuthorizationUrl } from "./../utils/oauth.util.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Router({
  mergeParams: true,
});

const filePath = join(__dirname, '../static/auth.html')
app.get('/callback', async (req, res) => {

  const { code } = req.query;

  if (!code) {
    return res.status(400).send(`        
      <!DOCTYPE html>
        <html>
        <head>
            <title>Bad Request</title>
        </head>
        <body>
            <h1>Bad Request</h1>
            <h2> Code not found! </h2>
        </body>
        </html>
      `)
  }

  const { tokens } = await oAuth2Client.getToken(code);
  const { access_token, refresh_token } = tokens;

  if (!access_token || !refresh_token) {
    return res.status(400).send(`        
      <!DOCTYPE html>
        <html>
        <head>
            <title>Error!</title>
        </head>
        <body>
            <h1>Something Went Wrong</h1>
            <h2> Didn't found the access_token </h2>
        </body>
        </html>
      `)
  }
  console.log("Before:", oAuth2Client.credentials)
  oAuth2Client.setCredentials(tokens);
  console.log("After:", oAuth2Client.credentials)
  console.log("AccressToken:", access_token, "\nRefreshToken:", refresh_token)

  return res.sendFile(filePath);
})

app.get('/authUrl', async (req, res) => {
  const authorizationUrl = await getAuthorizationUrl()
  return res.redirect(authorizationUrl)
});

export default app;