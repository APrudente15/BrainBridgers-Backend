const SchoolDay = require('../../models/SchoolDay');
const db = require('../../database/connect');

jest.mock('../../database/connect')

describe("SchoolDay", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

    describe("getCurrentSchoolDayForStudent", () => {
  
      it("should return the current school day for a student", async () => {
        const mockRows = [{ id: 1, date: new Date(), lesson1_id: "Maths"}];
        db.query.mockResolvedValueOnce({ rows: mockRows });

        const studentId = 1;
        const result = await SchoolDay.getCurrentSchoolDayForStudent(studentId);

        expect(result).toEqual(new SchoolDay(mockRows[0]));
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

    describe("getOneById", () => {

      it("should return a school day by ID", async () => {
          const mockId = 1;
          const mockSchoolDay = {
              id: mockId,
              student_id: 1,
              date: new Date(),
              lesson1_id: "Math",
              lesson2_id: "Science",
              lesson3_id: "History",
              lesson4_id: "English",
              lesson5_id: "Geography"
          };

          db.query.mockResolvedValueOnce({ rows: [mockSchoolDay] });

          const result = await SchoolDay.getOneById(mockId);

          expect(result).toEqual(new SchoolDay(mockSchoolDay));
          expect(db.query).toHaveBeenCalled();
      });

    it("should throw an error if database query fails", async () => {
        const mockId = 3;
        const mockError = new Error("Database query failed");
        db.query.mockRejectedValueOnce(mockError);
        await expect(SchoolDay.getOneById(mockId)).rejects.toThrowError(mockError);
        expect(db.query).toHaveBeenCalled();
    });

      
  });

  });
