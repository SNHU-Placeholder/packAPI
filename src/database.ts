import { createPool, createSqlTag } from "slonik";
import { User } from "./model.ts";

export const pool = await createPool("postgres://packer:sheExonmyPotilliGo@host.docker.internal:9564/pack");

export const sql = createSqlTag({
    typeAliases: {
        user: User,
    },
});

export function getUser(userId: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1`),
    );
}
