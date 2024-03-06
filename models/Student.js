const db = require('../database/connect');

class Student {
    constructor({ id, name, username, password }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
    }

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
            if (rows.length === 0) {
                const error = new Error('No student found');
                error.code = 'NO_STUDENT_FOUND';
                throw error;
            }
            return new Student(rows[0]);
        } catch (error) {
            console.error('Error in `models/Student.getOneByUsername`:', error);
            throw error;
        }
    }

    static async getOneById(id) {
        try {
            const query = `
                SELECT
                    *
                FROM
                    student
                WHERE
                    id = $1
            `;
            const values = [id];
            const { rows } = await db.query(query, values);
            if (rows.length === 0) {
                const error = new Error('No student found');
                error.code = 'NO_STUDENT_FOUND';
                throw error;
            }
            return new Student(rows[0]);
        } catch (error) {
            console.error('Error in `models/Student.getOneById`:', error);
            throw error;
        }
    }
}

module.exports = Student;