CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users
(
    user_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    fname   TEXT             NOT NULL,
    lname   TEXT             NOT NULL,
    email   TEXT             NOT NULL UNIQUE,
    created TIMESTAMP        NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trips
(
    trip_id       uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id       uuid REFERENCES users (user_id),
    name          TEXT             NOT NULL,
    -- optional trip attributes --
    region        CHAR(2),
    length        INTEGER,
    purpose       TEXT,
    all_inclusive BOOLEAN                   DEFAULT FALSE,
    airport       TEXT,
    flight_time   TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items
(
    item_id   uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    trip_id   uuid REFERENCES trips (trip_id),
    user_id   uuid REFERENCES users (user_id),
    item_name TEXT             NOT NULL,
    quantity  SMALLINT         NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions
(
    user_id uuid             NOT NULL REFERENCES users (user_id),
    expires TIMESTAMP        NOT NULL DEFAULT NOW() + INTERVAL '1 year',
    created TIMESTAMP        NOT NULL DEFAULT NOW(),
    token   TEXT PRIMARY KEY NOT NULL DEFAULT REPLACE(ENCODE(gen_random_bytes(128), 'base64'),
                                                      E'\n', '/')
);
