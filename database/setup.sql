DROP TABLE IF EXISTS SchoolDay CASCADE;

DROP TABLE IF EXISTS Lesson CASCADE;

DROP TABLE IF EXISTS Subject CASCADE;

DROP TABLE IF EXISTS Student CASCADE;

DROP TABLE IF EXISTS Token CASCADE;

-- Create Student Table
CREATE TABLE Student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);

-- Create Token Table
CREATE TABLE Token (
    id SERIAL PRIMARY KEY,
    student_id INT,
    token VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES Student(id)
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
    subject_id INT,
    confidence INT CHECK (confidence IN (0, 1, 2, 3)),
    enjoyment INT CHECK (enjoyment IN (0, 1, 2, 3)),
    FOREIGN KEY (subject_id) REFERENCES Subject(id)
);

-- Create SchoolDay Table
-- We can now reference the Student and Lesson tables, which have been created.
CREATE TABLE SchoolDay (
    id SERIAL PRIMARY KEY,
    student_id INT,
    date DATE,
    lesson1_id INT,
    lesson2_id INT,
    lesson3_id INT,
    lesson4_id INT,
    lesson5_id INT,
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (lesson1_id) REFERENCES Lesson(id),
    FOREIGN KEY (lesson2_id) REFERENCES Lesson(id),
    FOREIGN KEY (lesson3_id) REFERENCES Lesson(id),
    FOREIGN KEY (lesson4_id) REFERENCES Lesson(id),
    FOREIGN KEY (lesson5_id) REFERENCES Lesson(id)
);