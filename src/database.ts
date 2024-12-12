import { createPool, createSqlTag } from "slonik";
import { credentials } from "./env.ts";
import { Item, ItemUpdate, NewItem, NewTrip, Session, Trip, User } from "./model.ts";

export const pool = await createPool(credentials.db);

export const sql = createSqlTag({
    typeAliases: {
        user: User,
        trip: Trip,
        item: Item,
        session: Session,
    },
});

export function getUser(userId: string): Promise<User | null> {
    return pool.connect(connection =>
        connection.maybeOne(sql.typeAlias("user")`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1;`),
    );
}

export function getUserTrips(userId: string): Promise<readonly Trip[]> {
    return pool.connect(connection =>
        connection.many(sql.typeAlias("trip")`SELECT * FROM trips WHERE user_id = ${userId};`),
    );
}

export function getTrip(tripId: string, userId: string): Promise<Trip | null> {
    return pool.connect(connection =>
        connection.maybeOne(
            sql.typeAlias("trip")`SELECT * FROM trips WHERE trip_id = ${tripId} AND user_id = ${userId} LIMIT 1;`,
        ),
    );
}

export async function getItemsByTrip(tripId: string, userId: string): Promise<readonly Item[]> {
    const trip = await getTrip(tripId, userId);

    if (!trip) throw new Error("Trip not found");

    return pool.connect(connection =>
        connection.many(sql.typeAlias("item")`SELECT * FROM items WHERE trip_id = ${tripId};`),
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

export function createTrip(trip: NewTrip, userId: string): Promise<Trip> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("trip")`
            INSERT INTO trips (user_id, name, region, length, purpose, all_inclusive)
            VALUES (${userId}, ${trip.name}, ${trip.region}, ${trip.length}, ${trip.purpose},
                    ${trip.all_inclusive})
            RETURNING *
        `),
    );
}

export async function createItem(item: NewItem, userId: string): Promise<Item> {
    const trip = await getTrip(item.trip_id, userId);

    if (!trip) throw new Error("Trip not found");

    return pool.connect(connection =>
        connection.one(sql.typeAlias("item")`
            INSERT INTO items (user_id, trip_id, item_name, quantity, checked)
            VALUES (${userId}, ${item.trip_id}, ${item.item_name}, ${item.quantity}, ${item.checked})
            RETURNING *
        `),
    );
}

export async function updateItem(itemId: string, tripId: string, userId: string, item: ItemUpdate): Promise<Item> {
    const trip = await getTrip(tripId, userId);

    if (!trip) throw new Error("Trip not found");

    const updateFields = Object.entries(item).map(
        ([key, value]) => sql.typeAlias("item")`${sql.identifier([key])} = ${value}`,
    );

    if (updateFields.length === 0) throw new Error("No fields to update");

    const updateClause = sql.join(updateFields, sql.fragment`, `);

    return pool.connect(connection =>
        connection.one(sql.typeAlias("item")`
            UPDATE items
            SET ${updateClause}
            WHERE item_id = ${itemId} AND trip_id = ${tripId} AND user_id = ${userId}
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
