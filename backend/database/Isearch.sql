DROP DATABASE firmsearch;
CREATE DATABASE firmsearch;
\connect firmsearch

\i IsearchSchema.sql

DROP DATABASE firmsearchtest;
CREATE DATABASE firmsearchtest;
\connect firmsearchtest

\i IsearchSchema.sql