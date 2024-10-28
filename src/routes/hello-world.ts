import type { RequestHandler } from "express";

export const helloWorld: RequestHandler = (req, res) => {
    res.send("Hello World!");
};
