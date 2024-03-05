DROP TABLE IF EXISTS SchoolDay CASCADE;
DROP TABLE IF EXISTS Subject CASCADE;
DROP TABLE IF EXISTS Student CASCADE;

INSERT INTO SchoolDay
  (date, lesson1_id, lesson2_id, lesson3_id, lesson4_id, lesson5_id)
VALUES
('2024-03-04', '9', '1', '8', '10', '11'),
('2024-03-05', '7', '8', '5', '6', '1'),
('2024-03-06', '3', '1', '11', '4', '13'),
('2024-03-07', '2', '9', '5', '1', '10'),
('2024-03-08', '2', '7', '12', '13', '3');

INSERT INTO Subject
  (name)
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

INSERT INTO Student
  (name, username, password)
VALUES
('Lilly', 'Lillypad58', 'cabbage');