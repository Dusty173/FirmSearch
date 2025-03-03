CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    hashed_pw TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN,
    created_at TIMESTAMP
)

CREATE TABLE pagedata(
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    author INTEGER REFERENCES users,
    aboutinfo TEXT NOT NULL,
    contact TEXT NOT NULL,
    homepgtxt TEXT NOT NULL
)