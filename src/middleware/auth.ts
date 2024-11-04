import type { RequestHandler } from "express";

export const auth: RequestHandler = async (req, res, next) => {
    if (req.headers.authorization !== "Bearer 123") {
        res.status(401).json(
            {"response": "Unauthorized"}
        );
        return;
    }

    next();
};
