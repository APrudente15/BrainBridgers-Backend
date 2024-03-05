const SchoolDay = require('../../models/SchoolDay');
const db = require('../../database/connect');

jest.mock('../../database/connect'); // Mocking the database connection

describe("SchoolDay", () => {
    describe("getCurrentSchoolDayForStudent", () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
  
      it("should return the current school day for a student", async () => {
        // Mocking the database query result
        const mockRows = [{ id: 1, date: new Date(), lesson1_id: "Maths", /* Add other columns as needed */ }];
        db.query.mockResolvedValueOnce({ rows: mockRows });
  
        // Call the method
        const studentId = 1;
        const result = await SchoolDay.getCurrentSchoolDayForStudent(studentId);
  
        // Expectations
        expect(result).toEqual(mockRows[0]);
        expect(db.query).toHaveBeenCalledWith(
          expect.any(String),
          expect.arrayContaining([studentId])
        );
      });
  
      it("should throw an error when database query fails", async () => {
        // Mocking a database error
        const mockError = new Error("Database query failed");
        db.query.mockRejectedValueOnce(mockError);
  
        // Call the method
        const studentId = 1;
        await expect(SchoolDay.getCurrentSchoolDayForStudent(studentId)).rejects.toThrowError(mockError);
  
        // Expectations
        expect(db.query).toHaveBeenCalledWith(
          expect.any(String),
          expect.arrayContaining([studentId])
        );
      });
    });
  });