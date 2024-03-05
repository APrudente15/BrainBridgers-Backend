const db = require("../database/connect");
const { v4: uuid } = require("uuid");

class Token {

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
            return rows[0];
        } catch (error) {
            console.error('Error in `models/Token.createToken`:', error);
            throw error;
        }
    }
}

module.exports = Token;