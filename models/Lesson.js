const db = require("../database/connect");

class Lesson {

    static async updateConfidence(id, confidence) {
        try {
            const query = `
                UPDATE
                    lesson
                SET
                    confidence = $1
                WHERE
                    id = $2
                RETURNING
                    *
            `;
            const values = [confidence, id];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error in `models/Lesson.updateConfidence`:', error);
            throw error;
        }
    }
}

module.exports = Lesson;