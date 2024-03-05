const db = require("../database/connect");
const SchoolDay = require("./SchoolDay");

class Lesson {
    constructor({
        id,
        subject_id,
        confidence,
        enjoyment,
        subject_name = null  // Could be refactored as a view-model, but in the interest of time ... 
    }) {
        this.id = id;
        this.subjectId = subject_id;
        this.confidence = confidence;
        this.enjoyment = enjoyment;
        this.subjectName = subject_name;
    }

    static async getLessonsForSchoolDay(schoolDayId) {
        try {
            const schoolDay = await SchoolDay.getOneById(schoolDayId);
            const query = `
                SELECT
                    lesson.*, subject.name AS subject_name
                FROM
                    lesson
                JOIN 
                    subject ON lesson.subject_id = subject.id
                WHERE
                    lesson.id IN ($1, $2, $3, $4, $5)
            `;
            const values = [
                schoolDay.lesson1_id,
                schoolDay.lesson2_id,
                schoolDay.lesson3_id,
                schoolDay.lesson4_id,
                schoolDay.lesson5_id
            ];
            const { rows } = await db.query(query, values);
            return rows.map(row => new Lesson(row));
        } catch (error) {
            console.error('Error in `models/Lesson.getLessonsForSchoolDay`:', error);
            throw error;
        }
    }

    static async getLessonsForStudent(studentId) {
        try {
            const schoolDays = await SchoolDay.getSchoolDaysForStudent(studentId);
            const lessonIds = schoolDays.reduce((acc, schoolDay) => {
                return acc.concat([
                    schoolDay.lesson1_id,
                    schoolDay.lesson2_id,
                    schoolDay.lesson3_id,
                    schoolDay.lesson4_id,
                    schoolDay.lesson5_id
                ]);
            }, []);
            const query = `
                SELECT
                    lesson.*, subject.name AS subject_name
                FROM
                    lesson
                JOIN 
                    subject ON lesson.subject_id = subject.id
                WHERE
                    lesson.id IN (${lessonIds.join(',')})
            `;
            const { rows } = await db.query(query);
            return rows.map(row => new Lesson(row));
        } catch (error) {
            console.error('Error in `models/Lesson.getLessonsForStudent`:', error);
            throw error;
        }
    }

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

    static async updateEnjoyment(id, enjoyment) {
        try {
            const query = `
                UPDATE
                    lesson
                SET
                    enjoyment = $1
                WHERE
                    id = $2
                RETURNING
                    *
            `;
            const values = [enjoyment, id];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error in `models/Lesson.updateEnjoyment`:', error);
            throw error;
        }
    }
}

module.exports = Lesson;