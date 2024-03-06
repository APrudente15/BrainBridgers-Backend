TRUNCATE TABLE Subject CASCADE;

TRUNCATE TABLE Lesson CASCADE;

TRUNCATE TABLE Student CASCADE;

TRUNCATE TABLE SchoolDay CASCADE;

TRUNCATE TABLE Token CASCADE;

-- reset the primary key sequence 
ALTER SEQUENCE Subject_id_seq RESTART WITH 1;

ALTER SEQUENCE Lesson_id_seq RESTART WITH 1;

ALTER SEQUENCE Student_id_seq RESTART WITH 1;

ALTER SEQUENCE SchoolDay_id_seq RESTART WITH 1;

ALTER SEQUENCE Token_id_seq RESTART WITH 1;


INSERT INTO
  Subject (name)
VALUES
  ('Maths'),
  ('Chemistry'),
  ('Drama'),
  ('History'),
  ('Geography'),
  ('Computer Science'),
  ('Biology'),
  ('Physics'),
  ('Art'),
  ('PE'),
  ('French'),
  ('English Literature'),
  ('English Language');

INSERT INTO
  Lesson (subject_id, confidence, enjoyment)
VALUES
  (1, 0, 0),
  (2, 0, 0),
  (3, 0, 0),
  (4, 0, 0),
  (5, 0, 0),
  (6, 0, 0),
  (7, 0, 0),
  (8, 0, 0),
  (9, 0, 0),
  (10, 0, 0),
  (11, 0, 0),
  (12, 0, 0),
  (13, 0, 0),
  (1, 0, 0),
  (2, 0, 0),
  (3, 0, 0),
  (4, 0, 0),
  (5, 0, 0),
  (6, 0, 0),
  (7, 0, 0),
  (8, 0, 0),
  (9, 0, 0),
  (10, 0, 0),
  (11, 0, 0),
  (12, 0, 0),
  (13, 0, 0);

INSERT INTO
  Student (name, username, password)
VALUES
  ('Lilly Savage', 'Lillypad58', '$2b$10$UvzgBXWN5/qDN9lujLtpcet72VjOuWgcJ0zMDkFK37OypfTWsJHEa');

INSERT INTO
  SchoolDay (
    student_id,
    date,
    lesson1_id,
    lesson2_id,
    lesson3_id,
    lesson4_id,
    lesson5_id
  )
VALUES
  (1, '2024-03-04', 1, 2, 3, 4, 5),
  (1, '2024-03-05', 6, 7, 8, 9, 10),
  (1, '2024-03-06', 11, 12, 13, 14, 15),
  (1, '2024-03-07', 16, 17, 18, 19, 20),
  (1, '2024-03-08', 21, 22, 23, 24, 25);
