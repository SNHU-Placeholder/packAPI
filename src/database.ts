import { createPool, createSqlTag } from "slonik";
import { credentials } from "./env.ts";
import { Item, Session, Trip, User } from "./model.ts";

export const pool = await createPool(credentials.db);

export const sql = createSqlTag({
    typeAliases: {
        user: User,
        trip: Trip,
        item: Item,
        session: Session,
    },
});

export function getUser(userId: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1;`),
    );
}

export function getUserTrips(userId: string): Promise<readonly Trip[]> {
    return pool.connect(connection =>
        connection.many(sql.typeAlias("trip")`SELECT * FROM trips WHERE user_id = ${userId};`),
    );
}

export function getTrip(tripID: string): Promise<Trip> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("trip")`SELECT * FROM trips WHERE trip_id = ${tripID} LIMIT 1;`),
    );
}

export function getItemsByTrip(tripID: string): Promise<readonly Item[]> {
    return pool.connect(connection =>
        connection.many(sql.typeAlias("item")`SELECT * FROM items WHERE trip_id = ${tripID};`),
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
