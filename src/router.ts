import type { Express } from "express";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export type Route = (app: Express) => void;

export async function initRouter(app: Express) {
    const files = await readdir(join(import.meta.dirname, "routes"), {
        recursive: true,
    });

    await Promise.all(
        files.map(async file => {
            const route = await import(`./routes/${file}`);
            route.route(app);
        }),
    );
}
