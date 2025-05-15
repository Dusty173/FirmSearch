CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    hashed_pw TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN,
    created_at TIMESTAMP
);

CREATE TABLE pagedata(
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    aboutinfo TEXT NOT NULL,
    contact TEXT NOT NULL,
    homepgtxt TEXT NOT NULL
);

CREATE TABLE savedfirms(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    firmcrd INTEGER NOT NULL,
    firmname TEXT NOT NULL
)

CREATE TABLE resourcepage(
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users,
    created_at TIMESTAMP,
    textdata TEXT NOT NULL,
    link TEXT NOT NULL
)

CREATE TABLE reviewpage(
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users,
    created_at TIMESTAMP,
    title TEXT NOT NULL,
    textdata TEXT NOT NULL,
    link TEXT NOT NULL
)