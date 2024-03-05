const db = require('../database/connect');

class Student {

    static async getOneByUsername(username) {
        try {
            const query = `
                SELECT
                    *
                FROM
                    student
                WHERE
                    username = $1
            `;
            const values = [username];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error in `models/Student.getOneByUsername`:', error);
            throw error;
        }
    }
}

module.exports = Student;