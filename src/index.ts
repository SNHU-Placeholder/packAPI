import express from "express";

const app = express();

app.get("/sync", (req, res) => {
    res.send("Hello World");
});

app.listen(8083);
