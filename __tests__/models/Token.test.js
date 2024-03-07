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

    describe('getOneByToken', () => {
        it('should retrieve a token for a given token', async () => {
            const mockToken = 'mock_token_value';
            const mockResult = { id: 1, student_id: 1, token: mockToken };

            db.query.mockResolvedValueOnce({ rows: [mockResult] });

            const result = await Token.getOneByToken(mockToken);

            expect(result).toEqual(new Token(mockResult));
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockToken])
            );
        });

        it('should throw an error if no token found', async () => {
            const mockToken = 'non_existing_token';
            const mockError = new Error('No token found');
            mockError.code = 'NO_TOKEN_FOUND';

            db.query.mockResolvedValueOnce({ rows: [] });

            await expect(Token.getOneByToken(mockToken)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockToken])
            );
        });

        it('should throw an error if there is an error in database query', async () => {
            const mockToken = 'mock_token_value';
            const mockError = new Error('Database query failed');

            db.query.mockRejectedValueOnce(mockError);

            await expect(Token.getOneByToken(mockToken)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockToken])
            );
        });
    });

    describe('getStudentByToken', () => {
        it('should retrieve a student for a given token', async () => {

            const mockToken = 'mock_token_value';
            const mockStudent = {
                id: 1,
                name: 'Test Name',
                username: 'testuser',
                password: 'password123'
            };
    
            db.query.mockResolvedValueOnce({ rows: [{ student_id: mockStudent.id }] });
    
            Student.getOneById = jest.fn().mockResolvedValueOnce(mockStudent);
    
            const result = await Token.getStudentByToken(mockToken);
    
            expect(result).toEqual(mockStudent);
    
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockToken])
            );
    
            expect(Student.getOneById).toHaveBeenCalledWith(mockStudent.id);
        });
    
        it('should throw an error if no token found', async () => {

            const mockToken = 'non_existing_token';
            const mockError = new Error('No token found');
            mockError.code = 'NO_TOKEN_FOUND';
    
            db.query.mockResolvedValueOnce({ rows: [] });
    
            await expect(Token.getStudentByToken(mockToken)).rejects.toThrowError(mockError);
    
            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockToken])
            );
        });
    
        it('should throw an error if there is an error in database query', async () => {

            const mockToken = 'mock_token_value';
            const mockError = new Error('Database query failed');
    
            db.query.mockRejectedValueOnce(mockError);

            await expect(Token.getStudentByToken(mockToken)).rejects.toThrowError(mockError);

            expect(db.query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([mockToken])
            );
        });
    });

    });

