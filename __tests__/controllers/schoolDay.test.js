const { getCurrentSchoolDayForStudent } = require('../../controllers/schoolDay');
const SchoolDay = require('../../models/SchoolDay');

jest.mock('../../models/SchoolDay');

describe('getCurrentSchoolDayForStudent', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: 1 } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the current school day for a student', async () => {
        const mockSchoolDay = { id: 1, date: new Date(), lesson1_id: '1', lesson2_id: '2', lesson3_id: '3', lesson4_id: '4', lesson5_id: '5' };
        SchoolDay.getCurrentSchoolDayForStudent.mockResolvedValueOnce(mockSchoolDay);

        await getCurrentSchoolDayForStudent(req, res);

        expect(SchoolDay.getCurrentSchoolDayForStudent).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ schoolDay: mockSchoolDay });
    });

    it('should return 500 and error message when an error occurs', async () => {
        const mockError = new Error('Database query failed');
        SchoolDay.getCurrentSchoolDayForStudent.mockRejectedValueOnce(mockError);

        await getCurrentSchoolDayForStudent(req, res);

        expect(SchoolDay.getCurrentSchoolDayForStudent).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
});
