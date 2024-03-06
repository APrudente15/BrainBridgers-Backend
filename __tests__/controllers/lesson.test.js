const Lesson = require('../../models/Lesson');
const { updateConfidence, updateEnjoyment, getLessonsForSchoolDay, getLessonsForStudent } = require('../../controllers/lesson');

jest.mock('../../models/Lesson');

describe('Lesson Cotrollers', () => {
    describe('updateConfidence', () => {
        let req, res;

        beforeEach(() => {
            req = {
                params: { id: '1' },
                body: { confidence: '2' }
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should update confidence in a lesson', async () => {
            const mockLesson = { id: 1, confidence: 2 };
            Lesson.updateConfidence.mockResolvedValueOnce(mockLesson);

            await updateConfidence(req, res);

            expect(Lesson.updateConfidence).toHaveBeenCalledWith(1, 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockLesson);
        });

        it('should return 400 when lesson ID is invalid', async () => {
            req.params.id = 'invalid'
            await updateConfidence(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Lesson ID must be a positive integer' });
        });

        it('should return 400 when confidence score is invalid', async () => {
            req.body.confidence = 'invalid'
            await updateConfidence(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Confidence score must be an integer between 1 and 3' });
        });

        it('should return 500 when updating confidence fails', async () => {
            const mockError = new Error('Database query failed');
            Lesson.updateConfidence.mockRejectedValueOnce(mockError);

            await updateConfidence(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });

    describe('updateEnjoyment', () => {
        let req, res;

        beforeEach(() => {
            req = {
                params: { id: '1' },
                body: { enjoyment: '3' }
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should update enjoyment of a lesson', async () => {
            const mockLesson = { id: 1, enjoyment: 3 };
            Lesson.updateEnjoyment.mockResolvedValueOnce(mockLesson);

            await updateEnjoyment(req, res);

            expect(Lesson.updateEnjoyment).toHaveBeenCalledWith(1, 3);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockLesson);
        });

        it('should return 400 when lesson ID is invalid', async () => {
            req.params.id = 'invalid'
            await updateEnjoyment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Lesson ID must be a positive integer' });
        });

        it('should return 400 when enjoyment score is invalid', async () => {
            req.body.enjoyment = 'invalid'
            await updateEnjoyment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Enjoyment score must be an integer between 1 and 3' });
        });

        it('should return 500 when updating enjoyment fails', async () => {
            const mockError = new Error('Database query failed');
            Lesson.updateEnjoyment.mockRejectedValueOnce(mockError);

            await updateEnjoyment(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
        });

        describe('getLessonsForSchoolDay', () => {
            it('should return lessons for a school day', async () => {
                const req = { params: { id: 1 } };
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
                const mockLessons = [{ id: 1, subject: 'Maths' }];
                Lesson.getLessonsForSchoolDay.mockResolvedValueOnce(mockLessons);
    
                await getLessonsForSchoolDay(req, res);
    
                expect(Lesson.getLessonsForSchoolDay).toHaveBeenCalledWith(req.params.id);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith({ lessons: mockLessons });
            });
    
            it('should handle errors', async () => {
                const req = { params: { id: 1 } };
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
                const mockError = new Error('Database query failed');
                Lesson.getLessonsForSchoolDay.mockRejectedValueOnce(mockError);
    
                await getLessonsForSchoolDay(req, res);
    
                expect(Lesson.getLessonsForSchoolDay).toHaveBeenCalledWith(req.params.id);
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
            });
        })
    
    });

})