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
-- Should be 100 in total
-- Monday, week 1
  (1, 3, 2),
  (2, 2, 1),
  (3, 3, 1),
  (4, 1, 2), 
  (5, 3, 1),

  -- Tuesday, week 1
  (6,  2, 3),
  (7, 1, 2),
  (8, 2, 1),
  (9, 3, 1),
  (10, 1, 2),

  -- Wednesday, week 1
  (11, 3, 1),
  (12, 1, 3),
  (13, 1, 2),
  (1, 3, 1),
  (2, 3, 1),

  -- Thursday, week 1
  (3, 1, 2),
  (4, 2, 2),
  (5, 3, 1),
  (6, 1, 2),
  (7, 2, 2),

  -- Friday, week 1
  -- This is the day of the demo, so `Lesson.enjoyment` & `Lesson.confidence` initialised at 0
  (8, 0, 0),
  (9, 0, 0),
  (10, 0, 0),
  (11, 0, 0),
  (12, 0, 0),

  -- Rest of the data continues
  (13, 2, 3),
  (1, 3, 1),
  (2, 1, 2),
  (3, 2, 2),
  (4, 3, 1),
  (5, 1, 2),
  (6, 2, 2),
  (7, 3, 1),
  (8, 1, 2),
  (9, 2, 2),
  (10, 3, 1),
  (11, 1, 2),
  (12, 2, 3),
  (13, 3, 1),
  (1, 3, 2),
  (2, 2, 2),
  (3, 3, 1),
  (4, 1, 2),
  (5, 2, 2),
  (6, 3, 1),
  (7, 1, 2),
  (8, 2, 2),
  (9, 3, 1),
  (10, 1, 2),
  (11, 2, 3),
  (12, 2, 3),
  (13, 1, 2),
  (1, 3, 1),
  (2, 3, 1),
  (3, 1, 2),
  (4, 3, 1),
  (5, 1, 2),
  (6, 1, 1),
  (7, 3, 2), 
  (8, 2, 2),
  (9, 1, 1),
  (10, 3, 2),
  (11, 2, 2),
  (12, 1, 3),
  (13, 3, 3),
  (1, 3, 1),
  (2, 3, 2),
  (3, 1, 1),
  (4, 3, 2),
  (5, 1, 2),
  (6, 2, 1),
  (7, 3, 2),
  (8, 1, 2),
  (9, 2, 1),
  (10, 3, 2),
  (11, 1, 2),
  (12, 2, 3),
  (13, 3, 2),
  (1, 3, 2),
  (2, 2, 1),
  (3, 3, 2),
  (4, 1, 2),
  (5, 2, 1),
  (6, 3, 2),
  (7, 1, 2),
  (8, 2, 1),
  (9, 3, 2),
  (10, 1, 2),
  (11, 2, 1),
  (12, 3, 3),
  (13, 1, 2),
  (1, 2, 1),
  (2, 3, 2),
  (3, 1, 2),
  (4, 2, 1),
  (5, 3, 2),
  (6, 1, 2),
  (7, 2, 1),
  (8, 3, 2),
  (9, 1, 2),
  (10, 2, 1);


INSERT INTO
  Student (name, username, password)
VALUES
  ('Gabriella Guthrie', 'gabz_loves_maths', '$2b$10$UvzgBXWN5/qDN9lujLtpcet72VjOuWgcJ0zMDkFK37OypfTWsJHEa');

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
-- Week 1
  (1, '2024-03-04', 1, 2, 3, 4, 5),
  (1, '2024-03-05', 6, 7, 8, 9, 10),
  (1, '2024-03-06', 11, 12, 13, 14, 15),
  (1, '2024-03-07', 16, 17, 18, 19, 20),
  (1, '2024-03-08', 21, 22, 23, 24, 25),
  -- Week 2
  (1, '2024-03-11', 26, 27, 28, 29, 30),
  (1, '2024-03-12', 31, 32, 33, 34, 35),
  (1, '2024-03-13', 36, 37, 38, 39, 40),
  (1, '2024-03-14', 41, 42, 43, 44, 45),
  (1, '2024-03-15', 46, 47, 48, 49, 50),
  -- Week 3
  (1, '2024-03-18', 51, 52, 53, 54, 55),
  (1, '2024-03-19', 56, 57, 58, 59, 60),
  (1, '2024-03-20', 61, 62, 63, 64, 65),
  (1, '2024-03-21', 66, 67, 68, 69, 70),
  (1, '2024-03-22', 71, 72, 73, 74, 75),
  -- Week 4
  (1, '2024-03-25', 76, 77, 78, 79, 80),
  (1, '2024-03-26', 81, 82, 83, 84, 85),
  (1, '2024-03-27', 86, 87, 88, 89, 90),
  (1, '2024-03-28', 91, 92, 93, 94, 95),
  (1, '2024-03-29', 96, 97, 98, 99, 100);
