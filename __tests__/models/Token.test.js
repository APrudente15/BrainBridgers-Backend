const Token = require('../../models/Token');
const db = require('../../database/connect');

jest.mock('../../database/connect');

jest.mock('uuid');
const { v4: uuidv4 } = require('uuid');

describe('Token', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a token for a given student ID', async () => {
            const mockStudentId = 1;
            const mockToken = 'mock_token_value';
            const mockResult = { id: 1, student_id: mockStudentId, token: mockToken };

            uuidv4.mockReturnValueOnce(mockToken);

            db.query.mockResolvedValueOnce({ rows: [mockResult] });

            const result = await Token.create(mockStudentId);

            expect(result).toEqual(mockResult);
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockStudentId, mockToken])
            );
        });

        it('should throw an error if there is an error in database query', async () => {
            const mockStudentId = 1;
            const mockError = new Error('Database query failed');

            uuidv4.mockReturnValueOnce('mock_token_value');
            db.query.mockRejectedValueOnce(mockError);

            await expect(Token.create(mockStudentId)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockStudentId, 'mock_token_value'])
            );
        });
    });
});