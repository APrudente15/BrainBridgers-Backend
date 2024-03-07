const db = require("../database/connect");
const { v4: uuid } = require("uuid");
const Student = require("./Student");

class Token {
    constructor({ id, student_id, token }) {
        this.id = id;
        this.student_id = student_id;
        this.token = token;
    }

    static async create(studentId) {
        const token = uuid();
        try {
            const query = `
                INSERT INTO
                    token (student_id, token)
                VALUES
                    ($1, $2)
                RETURNING
                    *
            `;
            const values = [studentId, token];
            const { rows } = await db.query(query, values);
            return new Token(rows[0]);
        } catch (error) {
            console.error('Error in `models/Token.createToken`:', error);
            throw error;
        }
    }

    static async getOneByToken(token) {
        try {
            const query = `
                SELECT
                    *
                FROM
                    token
                WHERE
                    token = $1
            `;
            const values = [token];
            const { rows } = await db.query(query, values);
            if (rows.length === 0) {
                const error = new Error('No token found');
                error.code = 'NO_TOKEN_FOUND';
                throw error;
            }
            return new Token(rows[0]);
        }
        catch (error) {
            console.error('Error in `models/Token.getOneByToken`:', error);
            throw error;
        }
    }

    static async getStudentByToken(token) {
        try {
            const query = `
                SELECT
                    *
                FROM
                    token
                WHERE
                    token = $1
            `;
            const values = [token];
            const { rows } = await db.query(query, values);
            if (rows.length === 0) {
                const error = new Error('No token found');
                error.code = 'NO_TOKEN_FOUND';
                throw error;
            }
            const student = await Student.getOneById(rows[0].student_id);
            return student;
        } catch (error) {
            console.error('Error in `models/Token.getStudentByToken`:', error);
            throw error;
        }
    }
}

module.exports = Token;