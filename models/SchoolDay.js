const db = require("../database/connect");

class SchoolDay {
    constructor({
        id,
        student_id,
        date,
        lesson1_id,
        lesson2_id,
        lesson3_id,
        lesson4_id,
        lesson5_id
    }) {
        this.id = id;
        this.studentId = student_id;
        this.date = date.toISOString().split('T')[0];  // YYYY-MM-DD (without time) 
        this.lesson1_id = lesson1_id;
        this.lesson2_id = lesson2_id;
        this.lesson3_id = lesson3_id;
        this.lesson4_id = lesson4_id;
        this.lesson5_id = lesson5_id;
    }

    static async getOneById(id) {
        try {
            const { rows } = await db.query(`
                SELECT * FROM schoolday
                WHERE id = $1;
            `, [id]);
            return new SchoolDay(rows[0]);
        } catch (error) {
            console.error('Error in `models/SchoolDay.getOneById`:', error);
            throw error;
        }
    }

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
            return new SchoolDay(rows[0]);
        } catch (error) {
            console.error('Error in `models/SchoolDay.getCurrentSchoolDayForStudent`:', error);
            throw error;
        }
    }

    static async getSchoolDaysForStudent(studentId) {
        try {
            const query = `
                SELECT
                    *
                FROM
                    schoolday
                WHERE
                    student_id = $1
            `;
            const values = [studentId];
            const { rows } = await db.query(query, values);
            return rows.map(row => new SchoolDay(row));
        } catch (error) {
            console.error('Error in `models/SchoolDay.getSchoolDaysForStudent`:', error);
            throw error;
        }
    }
}

module.exports = SchoolDay;