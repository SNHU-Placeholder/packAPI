import { OAuth2Client } from "google-auth-library";
import { credentials } from "../env.ts";

export const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
];

const google = credentials.oauth.google;

export function createOAuthClient() {
    return new OAuth2Client({
        clientId: google.client_id,
        clientSecret: google.client_secret,
        projectId: google.project_id,
        redirectUri: google.redirect_uri,
    });
}

export function generateAuthUrl() {
    const client = createOAuthClient();

    return client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
}

export function fetchProfile(client: OAuth2Client) {
    return client.request({ url: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses" });
}
