import { createPool, createSqlTag } from "slonik";
import { envFile } from "./env.ts";
import { Session, User } from "./model.ts";

export const pool = await createPool(envFile.db);

export const sql = createSqlTag({
    typeAliases: {
        user: User,
        session: Session,
    },
});

export function getUser(userId: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1`),
    );
}

export function createUser(fname: string, lname: string, email: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`
            INSERT INTO users (fname, lname, email)
            VALUES (${fname}, ${lname}, ${email})
            ON CONFLICT (email)
            DO UPDATE
                SET fname = EXCLUDED.fname, lname = EXCLUDED.lname
            RETURNING *
        `),
    );
}

export function createSession(userId: string): Promise<Session> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("session")`
            INSERT INTO sessions
            VALUES (${userId})
            ON CONFLICT (token)
                DO UPDATE SET token = ENCODE(gen_random_bytes(128), 'base64')
            RETURNING *
        `),
    );
}

export function getUserByToken(token: string): Promise<User | null> {
    return pool.connect(connection =>
        connection.maybeOne(sql.typeAlias("user")`
            SELECT users.*
            FROM sessions
                    JOIN users ON users.user_id = sessions.user_id
            WHERE token = ${token}
            LIMIT 1
        `),
    );
}
