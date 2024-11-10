import type { RequestHandler } from "express";
import { getUserByToken } from "../database.ts";

export const auth: RequestHandler = async (req, res, next) => {
    if (!req.headers.authorization) return void res.status(401).send("Unauthorized");

    const user = await getUserByToken(req.headers.authorization);

    if (!user) return void res.status(401).send("Unauthorized");

    res.locals.user = user;

    next();
};
