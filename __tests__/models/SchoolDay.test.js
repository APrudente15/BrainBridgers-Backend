const SchoolDay = require('../../models/SchoolDay');
const db = require('../../database/connect');

jest.mock('../../database/connect')

describe("SchoolDay", () => {
    describe("getCurrentSchoolDayForStudent", () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
  
      it("should return the current school day for a student", async () => {
        const mockRows = [{ id: 1, date: new Date(), lesson1_id: "Maths"}];
        db.query.mockResolvedValueOnce({ rows: mockRows });

        const studentId = 1;
        const result = await SchoolDay.getCurrentSchoolDayForStudent(studentId);

        expect(result).toEqual(mockRows[0]);
        expect(db.query).toHaveBeenCalledWith(
          expect.any(String),
          expect.arrayContaining([studentId])
        );
      });
  
      it("should throw an error when database query fails", async () => {
        const mockError = new Error("Database query failed")
        db.query.mockRejectedValueOnce(mockError)
  
        const studentId = 1;
        await expect(SchoolDay.getCurrentSchoolDayForStudent(studentId)).rejects.toThrowError(mockError);
  
        expect(db.query).toHaveBeenCalledWith(
          expect.any(String),
          expect.arrayContaining([studentId])
        );
      });
    });
  });