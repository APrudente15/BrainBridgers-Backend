const SchoolDay = require('../models/SchoolDay');

const getCurrentSchoolDayForStudent = async (req, res) => {
    try {
        const schoolDay = await SchoolDay.getCurrentSchoolDayForStudent(req.params.id);
        res.status(200).json({ schoolDay: schoolDay });
    } catch (error) {
        console.error('Error in `controllers/schoolDay.getCurrentSchoolDayForStudent`:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCurrentSchoolDayForStudent,
}