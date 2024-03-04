DROP TABLE IF EXISTS SchoolDay CASCADE;

DROP TABLE IF EXISTS Lesson CASCADE;

DROP TABLE IF EXISTS Subject CASCADE;

DROP TABLE IF EXISTS "User" CASCADE;

DROP TABLE IF EXISTS Token CASCADE;

-- Create Token Table
CREATE TABLE Token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255)
);

-- Create User Table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    token_id INT,
    FOREIGN KEY (token_id) REFERENCES Token(id)
);

-- Create Subject Table
CREATE TABLE Subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create Lesson Table
-- Note that we do not include the foreign key to SchoolDay here, as it has not been created yet.
CREATE TABLE Lesson (
    id SERIAL PRIMARY KEY,
    -- schoolday INT, -- This will be added later as an ALTER TABLE command.
    subject INT,
    confidence INT CHECK (confidence IN (1, 2, 3)),
    enjoyment INT CHECK (enjoyment IN (1, 2, 3)),
    FOREIGN KEY (subject) REFERENCES Subject(id)
);

-- Create SchoolDay Table
-- We can now reference the User and Lesson tables, which have been created.
CREATE TABLE SchoolDay (
    id SERIAL PRIMARY KEY,
    student INT,
    date DATE,
    lesson1 INT,
    lesson2 INT,
    lesson3 INT,
    lesson4 INT,
    lesson5 INT,
    FOREIGN KEY (student) REFERENCES "User"(id),
    FOREIGN KEY (lesson1) REFERENCES Lesson(id),
    FOREIGN KEY (lesson2) REFERENCES Lesson(id),
    FOREIGN KEY (lesson3) REFERENCES Lesson(id),
    FOREIGN KEY (lesson4) REFERENCES Lesson(id),
    FOREIGN KEY (lesson5) REFERENCES Lesson(id)
);

-- Now that the SchoolDay table has been created, we can add the schoolday foreign key to the Lesson table.
ALTER TABLE
    Lesson
ADD
    COLUMN schoolday INT;

ALTER TABLE
    Lesson
ADD
    FOREIGN KEY (schoolday) REFERENCES SchoolDay(id);