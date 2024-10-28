CREATE TABLE IF NOT EXISTS users(
    user_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT now(),
);

CREATE TABLE IF NOT EXISTS trips(
    trip_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES USERS(user_id),
    trip_name TEXT,
    -- optional trip attributes --
    region CHAR(2),
    triplength INTEGER,
    purpose TEXT,
    allinclusive BOOLEAN DEFAULT false,
    airport TEXT,
    flight_time TIMESTAMP,
);