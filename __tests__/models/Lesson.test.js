const db = require("../../database/connect");
const Lesson = require("../../models/Lesson");
const SchoolDay = require("../../models/SchoolDay");

jest.mock("../../database/connect");

describe("Lesson", () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe("updateConfidence", () => {
        it("should update confidence of a lesson", async () => {
            const mockLessonId = 1;
            const mockConfidence = 2;
            const mockRows = [{ id: mockLessonId, confidence: mockConfidence }];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const updatedLesson = await Lesson.updateConfidence(mockLessonId, mockConfidence);

            expect(db.query).toHaveBeenCalledWith(expect.any(String), [mockConfidence, mockLessonId]);
            expect(updatedLesson).toEqual(mockRows[0]);
        });

        it("should throw an error when updating confidence fails", async () => {
            const mockError = new Error("Database query failed");
            db.query.mockRejectedValueOnce(mockError);

            await expect(Lesson.updateConfidence(1, 2)).rejects.toThrow(mockError);

            expect(db.query).toHaveBeenCalledWith(expect.any(String), [2, 1]);
        });
    });

    describe("updateEnjoyment", () => {
        it("should update enjoyment of a lesson", async () => {
            const mockLessonId = 1;
            const mockEnjoyment = 3;
            const mockRows = [{ id: mockLessonId, enjoyment: mockEnjoyment }];

            db.query.mockResolvedValueOnce({ rows: mockRows });

            const updatedLesson = await Lesson.updateEnjoyment(mockLessonId, mockEnjoyment);

            expect(db.query).toHaveBeenCalledWith(expect.any(String), [mockEnjoyment, mockLessonId]);
            expect(updatedLesson).toEqual(mockRows[0]);
        });

        it("should throw an error when updating enjoyment fails", async () => {
            const mockError = new Error("Database query failed");
            db.query.mockRejectedValueOnce(mockError);

            await expect(Lesson.updateEnjoyment(1, 3)).rejects.toThrow(mockError);

            expect(db.query).toHaveBeenCalledWith(expect.any(String), [3, 1]);
        });
    });

    describe("getLessonsForSchoolDay", () => {
        it("should fetch lessons for a given school day ID", async () => {
            const mockSchoolDayId = 1;
            const mockSchoolDay = {
                lesson1_id: 1,
                lesson2_id: 2,
                lesson3_id: 3,
                lesson4_id: 4,
                lesson5_id: 5
            };

            const mockLessons = [
                { id: 1, subject_id: 1, confidence: 3, enjoyment: 4, subject_name: "Math" },
                { id: 2, subject_id: 2, confidence: 4, enjoyment: 5, subject_name: "Science" },
                { id: 3, subject_id: 3, confidence: 2, enjoyment: 3, subject_name: "English" },
                { id: 4, subject_id: 4, confidence: 5, enjoyment: 2, subject_name: "History" },
                { id: 5, subject_id: 5, confidence: 3, enjoyment: 4, subject_name: "Geography" }
            ];

            db.query.mockResolvedValueOnce({ rows: mockLessons });

            SchoolDay.getOneById = jest.fn().mockResolvedValue(mockSchoolDay);

            const fetchedLessons = await Lesson.getLessonsForSchoolDay(mockSchoolDayId);

            expect(SchoolDay.getOneById).toHaveBeenCalledWith(mockSchoolDayId);
            expect(db.query).toHaveBeenCalledWith(expect.any(String), [
                mockSchoolDay.lesson1_id,
                mockSchoolDay.lesson2_id,
                mockSchoolDay.lesson3_id,
                mockSchoolDay.lesson4_id,
                mockSchoolDay.lesson5_id
            ]);
            expect(fetchedLessons).toEqual(mockLessons.map(lesson => new Lesson(lesson)));
        });

        it("should throw an error if fetching lessons for a school day fails", async () => {
            const mockSchoolDayId = 1;
            const mockError = new Error("Database query failed");

            SchoolDay.getOneById = jest.fn().mockRejectedValue(mockError);

            await expect(Lesson.getLessonsForSchoolDay(mockSchoolDayId)).rejects.toThrow(mockError);

            expect(SchoolDay.getOneById).toHaveBeenCalledWith(mockSchoolDayId);

            expect(db.query).not.toHaveBeenCalled();
        });
    });

    describe("getLessonsForStudent", () => {

        it("should throw an error if fetching lessons for a student fails", async () => {
            const mockStudentId = 1;
            const mockError = new Error("Database query failed");

            SchoolDay.getSchoolDaysForStudent = jest.fn().mockRejectedValue(mockError);

            await expect(Lesson.getLessonsForStudent(mockStudentId)).rejects.toThrow(mockError);

            expect(SchoolDay.getSchoolDaysForStudent).toHaveBeenCalledWith(mockStudentId);

            expect(db.query).not.toHaveBeenCalled();
        });
    });

});
