import { app } from "../server.ts";

app.get("/sync", (req, res) => {
    res.send("Hello, World 2!");
});
