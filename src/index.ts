import express from "express";
import { helloWorld } from "./routes/hello-world.ts";

const app = express();

app.get("/sync", helloWorld);

app.listen(8083);
