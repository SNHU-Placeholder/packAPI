import type { Route } from "../router.ts";

export const route: Route = app => {
    app.get("/sync", (req, res) => {
        res.send("Hello, World!");
    });
};
