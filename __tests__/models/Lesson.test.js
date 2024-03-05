const db = require("../../database/connect");
const Lesson = require("../../models/Lesson");

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
});
