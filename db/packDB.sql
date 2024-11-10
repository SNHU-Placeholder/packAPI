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
    trip_id      uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id      uuid REFERENCES users (user_id),
    trip_name    TEXT,
    -- optional trip attributes --
    region       CHAR(2),
    triplength   INTEGER,
    purpose      TEXT,
    allinclusive BOOLEAN                   DEFAULT FALSE,
    airport      TEXT,
    flight_time  TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items
(
    item_id   uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    trip_id   uuid REFERENCES trips (trip_id),
    user_id   uuid REFERENCES users (user_id),
    item_name TEXT             NOT NULL,
    quantity  SMALLINT         NOT NULL
);
