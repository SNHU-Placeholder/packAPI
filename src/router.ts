import { Router, type Express } from "express";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { auth } from "./middleware/auth.ts";

export type Route = (app: Express) => void;

export const userRouter = Router({
    caseSensitive: true,
});
userRouter.use(auth);

export async function initRouter(app: Express) {
    app.use("/user", userRouter);

    const files = await readdir(join(import.meta.dirname, "routes"), {
        recursive: true,
    });

    await Promise.all(
        files
            .filter(file => file.endsWith(".ts") && !file.endsWith(".d.ts"))
            .map(async file => import(`./routes/${file}`)),
    );
}
