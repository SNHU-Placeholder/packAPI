import { readFile } from "node:fs/promises";
import { z } from "zod";

export const Env = z.object({
    NODE_ENV: z.string().default("development"),
    OAUTH_CREDENTIALS_FILE: z.string(),
    PORT: z.coerce.number().default(8083),
});
export type Env = z.infer<typeof Env>;

export const env = Env.parse(process.env);

export const OAuthCredentials = z.object({
    client_id: z.string(),
    project_id: z.string(),
    client_secret: z.string(),
    redirect_uri: z.string(),
});
export type OAuthCredentials = z.infer<typeof OAuthCredentials>;

export const EnvFile = z.object({
    db: z.string(),
    oauth: z.object({
        google: OAuthCredentials,
    }),
});
export type OAuthCredentialsFile = z.infer<typeof EnvFile>;

export const envFile = EnvFile.parse(JSON.parse(await readFile(env.OAUTH_CREDENTIALS_FILE, "utf-8")));
