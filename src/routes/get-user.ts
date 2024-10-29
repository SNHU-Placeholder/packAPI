import { getUser } from "../database.ts";
import { app } from "../server.ts";

app.get("/user/:id", async (req, res) => {
    const user = await getUser(req.params.id);

    res.json(user);
});
