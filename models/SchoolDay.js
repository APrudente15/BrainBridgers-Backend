const db = require("../database/connect");

class SchoolDay {

    static async getCurrentSchoolDayForStudent(studentId) {
        try {
            const query = `
                SELECT
                    *
                FROM
                    schoolday
                WHERE
                    student_id = $1
                AND
                    date = CURRENT_DATE
            `;
            const values = [studentId];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error in `models/SchoolDay.getCurrentSchoolDayForStudent`:', error);
            throw error;
        }
    }
}

module.exports = SchoolDay;