import { createPool, createSqlTag } from "slonik";
import { User, Trip, Item } from "./model.ts";
import dotenv from "dotenv";

dotenv.config();
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
const DATABASE_ADDRESS = process.env.DATABASE_ADDRESS;
const DATABASE_PORT = process.env.DATABASE_PORT;

export const pool = await createPool(
    `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_ADDRESS}:${DATABASE_PORT}/${POSTGRES_DATABASE}`,
);

export const sql = createSqlTag({
    typeAliases: {
        user: User,
        trip: Trip,
        item: Item,
    },
});

export function getUser(userId: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1;`),
    );
}

export function getUserTrips(userId: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM trips WHERE user_id = ${userId};`),
    );
}

export function getTrip(tripID: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM trips WHERE trip_id = ${tripID} LIMIT 1;`),
    );
}

export function getItemsByTrip(tripID: string): Promise<User> {
    return pool.connect(connection =>
        connection.one(sql.typeAlias("user")`SELECT * FROM items WHERE trip_id = ${tripID};`),
    );
}