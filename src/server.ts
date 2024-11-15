import express from "express";
import { env } from "./env.ts";

export const app = express();

app.use(express.json());

app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
});
