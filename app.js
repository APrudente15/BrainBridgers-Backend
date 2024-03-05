const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const schoolDayController = require('./controllers/schoolDay');

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

app.get(
    // Get a student's current school day
    '/students/:id/schooldays/current',
    schoolDayController.getCurrentSchoolDayForStudent
);

module.exports = app;