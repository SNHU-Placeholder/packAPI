import { createPool, createSqlTag } from "slonik";
import { z } from "zod";

export const pool = await createPool("postgres://postgres:4I8WVsCjAars679bcEcb4buns6C0jFbM@localhost:5432/packup");

export const sql = createSqlTag({
    typeAliases: {
        user: z.object({
            user_id: z.string().uuid(),
            fname: z.string(),
            lname: z.string(),
            email: z.string().email(),
            created: z.date(),
        }),
    },
});
