const bcrypt = require('bcrypt');
const Student = require('../../models/Student');
const Token = require('../../models/Token');
const { login } = require('../../controllers/student');

jest.mock('bcrypt');
jest.mock('../../models/Student');
jest.mock('../../models/Token');

describe('Student Controller - Login', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully authenticate and return a token', async () => {
        const req = { body: { username: 'testuser', password: 'testpassword' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockStudent = { id: 1, username: 'testuser', password: '$2b$10$KljhOeLYRf6HR/F30EABQO1KHygNhxgls0NY0q6hwGt9NnF7ZQOJK' }; // hashed password
        const mockToken = { token: 'mockToken' };

        Student.getOneByUsername.mockResolvedValueOnce(mockStudent);
        bcrypt.compare.mockResolvedValueOnce(true);
        Token.create.mockResolvedValueOnce(mockToken);

        await login(req, res);

        expect(Student.getOneByUsername).toHaveBeenCalledWith(req.body.username);
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockStudent.password);
        expect(Token.create).toHaveBeenCalledWith(mockStudent.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ authenticated: true, token: mockToken.token });
    
    });


    it('should handle missing username or password', async () => {
        const req = { body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
    });

    it('should handle errors', async () => {
        const req = { body: { username: 'testuser', password: 'testpassword' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockError = new Error('Database query failed');

        Student.getOneByUsername.mockRejectedValueOnce(mockError);

        await login(req, res);

        expect(Student.getOneByUsername).toHaveBeenCalledWith(req.body.username);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });

})