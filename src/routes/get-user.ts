import { pool, sql } from "../database.ts";
import { app } from "../server.ts";

app.get("/user/:id", async (req, res) => {
    pool.connect(async connection => {
        const result = await connection.one(
            sql.typeAlias("user")`SELECT * FROM users WHERE user_id = ${req.params.id} LIMIT 1`,
        );

        res.json(result);
    });
});
