CREATE TABLE IF NOT EXISTS USERS(
    user_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT now(),
)

CREATE TABLE IF NOT EXISTS TRIPS(
    trip_id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES USERS(user_id),
    trip_name TEXT,
    region CHAR(2),
    length TEXT,
    purpose TEXT,
    allinclusive BOOLEAN,
    airport TEXT,
    flight_time TIMESTAMP,
)