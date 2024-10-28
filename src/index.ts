import express from "express";
import { initRouter } from "./router.ts";

const app = express();

initRouter(app);

app.listen(8083);
