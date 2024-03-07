const Student = require('../../models/Student');
const db = require('../../database/connect');

jest.mock('../../database/connect');

describe('Student', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getOneByUsername', () => {
        it('should return a student object for a given username', async () => {
            const mockUsername = 'testuser';
            const mockStudent = {
                id: 1,
                username: mockUsername,
                password: 'password123'
            };
            db.query.mockResolvedValueOnce({ rows: [mockStudent] });

            const result = await Student.getOneByUsername(mockUsername);

            expect(result).toEqual(mockStudent);
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockUsername])
            );
        });

        it('should throw an error if there is an error in database query', async () => {
            const mockUsername = 'testuser';
            const mockError = new Error('Database query failed');
            db.query.mockRejectedValueOnce(mockError);

            await expect(Student.getOneByUsername(mockUsername)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockUsername])
            );
        });
    });

    describe('getOneById', () => {
        it('should return a student object for a given ID', async () => {
            const mockId = 1;
            const mockStudent = {
                id: mockId,
                name: 'Test Name',
                username: 'testuser',
                password: 'password123'
            };
            db.query.mockResolvedValueOnce({ rows: [mockStudent] });

            const result = await Student.getOneById(mockId);

            expect(result).toEqual(new Student(mockStudent));
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockId])
            );
        });

        it('should throw an error if there is no student found for the given ID', async () => {
            const mockId = 999;
            const mockError = new Error('No student found');
            mockError.code = 'NO_STUDENT_FOUND';
            db.query.mockResolvedValueOnce({ rows: [] });

            await expect(Student.getOneById(mockId)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockId])
            );
        });

        it('should throw an error if there is an error in database query', async () => {
            const mockId = 1;
            const mockError = new Error('Database query failed');
            db.query.mockRejectedValueOnce(mockError);

            await expect(Student.getOneById(mockId)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockId])
            );
        });
    });

});
