CREATE TABLE States(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
)

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    hashed_pw TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN,
    created_at TIMESTAMP
)

CREATE TABLE Counties(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state_id INTEGER REFERENCES States
)

CREATE TABLE firms(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    established TIMESTAMP,
    contact TEXT NOT NULL,
    aumrecord TEXT NOT NULL,
    RIA VARBINARY,
    service_id INTEGER REFERENCES firm_services,
    county_id INTEGER REFERENCES Counties,
    state_id INTEGER REFERENCES States,
)

CREATE TABLE services(
    id SERIAL PRIMARY KEY,
    servicename TEXT NOT NULL,
    servicedesc TEXT NOT NULL
)


CREATE TABLE firm_services (
    id SERIAL PRIMARY KEY,
    firm_id INTEGER REFERENCES firms,
    service_id INTEGER REFERENCES services
)