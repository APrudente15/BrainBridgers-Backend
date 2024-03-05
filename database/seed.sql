DROP TABLE IF EXISTS SchoolDay CASCADE;
DROP TABLE IF EXISTS Subject CASCADE;
DROP TABLE IF EXISTS Student CASCADE;

INSERT INTO SchoolDay
  (date, lesson1_id, lesson2_id, lesson3_id, lesson4_id, lesson5_id)
VALUES
('', '', '', '', '', '')
('', '', '', '', '', '')
('', '', '', '', '', '')
('', '', '', '', '', '')
('', '', '', '', '', '')

INSERT INTO Subject
  (name)
VALUES
('Maths')
('Chemistry')
('Drama')
('History')
('Geography')
('Computer Science')
('Biology')
('Physics')
('Art')
('Music')
('French')

INSERT INTO Student
  (name, username, password)
VALUES
('Lilly', 'Lillypad58', 'cabbage')