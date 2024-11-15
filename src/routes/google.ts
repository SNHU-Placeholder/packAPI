import { createSession, createUser } from "../database.ts";
import { createOAuthClient, fetchProfile, generateAuthUrl, scopes } from "../oauth/google.ts";
import { app } from "../server.ts";

app.get("/auth/google", async (req, res) => {
    const { code, state } = req.query;

    // Redirect to auth page if no code is provided
    if (typeof code !== "string" || typeof state !== "string") return res.redirect(generateAuthUrl());

    res.redirect(`packup://auth/google?${new URLSearchParams({ code, state })}`);
});

app.post("/auth/google", async (req, res) => {
    const { code } = req.body;
    if (typeof code !== "string")
        return void res.status(400).json({
            error: "invalid_code",
        });

    console.log("code", code);

    const client = createOAuthClient();

    const r = await client.getToken(code);
    client.setCredentials(r.tokens);

    const [tokenInfo, profile] = await Promise.all([
        client.getTokenInfo(client.credentials.access_token!),
        fetchProfile(client),
    ]);

    if (!scopes.every(scope => tokenInfo.scopes.includes(scope)))
        return void res.status(400).json({
            error: "invalid_scope",
        });

    if (!tokenInfo.email || !tokenInfo.email_verified) return void res.status(400).json({ error: "invalid_email" });

    // TODO Validation?
    const name = (profile.data as any)?.names?.[0];

    if (!name) return void res.status(400).json({ error: "invalid_profile" });

    const user = await createUser(name.givenName, name.familyName, tokenInfo.email);

    const session = await createSession(user.user_id);

    res.json({ user, session });
});
