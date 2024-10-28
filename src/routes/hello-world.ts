import { app } from "../server.ts";

app.get("/ping", (req, res) => {
    res.send("Hello, World 2!");
});
