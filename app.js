const express = require('express');
const cors = require('cors');
const authenticator = require('./middleware/authenticator');
const logger = require('./middleware/logger');

const studentController = require('./controllers/student');
const schoolDayController = require('./controllers/schoolDay');
const lessonController = require('./controllers/lesson');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get(
    '/',
    (req, res) => {
        res.send('Hello World');
    }
);

app.post(
    '/students/login',
    studentController.login
)

app.get(
    // Get a student from the auth token in the request header
    '/students/me',
    studentController.getMe
)

app.get(
    // Get a student's current school day
    '/students/:id/schooldays/current',
    authenticator,
    schoolDayController.getCurrentSchoolDayForStudent
);

app.get(
    // Get all lessons for a particular school day
    '/schooldays/:id/lessons',
    authenticator,
    lessonController.getLessonsForSchoolDay
);

app.get(
    // Get all lessons for a particular student
    '/students/:id/lessons',
    authenticator,
    lessonController.getLessonsForStudent
);

app.patch(
    // Update the 'confidence' score for a particular lesson
    '/lessons/:id/confidence',
    authenticator,
    lessonController.updateConfidence
);

app.patch(
    // Update the 'enjoyment' score for a particular lesson
    '/lessons/:id/enjoyment',
    authenticator,
    lessonController.updateEnjoyment
);

module.exports = app;