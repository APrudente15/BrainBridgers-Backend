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
});
