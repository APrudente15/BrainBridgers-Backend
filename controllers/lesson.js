const Lesson = require('../models/Lesson');

const updateConfidence = async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Lesson ID must be a positive integer' });
    }

    const confidence = parseInt(req.body.confidence);
    if (confidence === undefined || confidence < 1 || confidence > 3 || !Number.isInteger(confidence)) {
        return res.status(400).json({ error: 'Confidence score must be an integer between 1 and 3' });
    }

    try {
        const lesson = await Lesson.updateConfidence(id, confidence);
        res.status(200).json(lesson);
    } catch (error) {
        console.error('Error in `controllers/lesson.updateConfidence`:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateEnjoyment = async (req, res) => {

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Lesson ID must be a positive integer' });
    }

    const enjoyment = parseInt(req.body.enjoyment);
    if (enjoyment === undefined || enjoyment < 1 || enjoyment > 3 || !Number.isInteger(enjoyment)) {
        return res.status(400).json({ error: 'Enjoyment score must be an integer between 1 and 3' });
    }

    try {
        const lesson = await Lesson.updateEnjoyment(id, enjoyment);
        res.status(200).json(lesson);
    } catch (error) {
        console.error('Error in `controllers/lesson.updateEnjoyment`:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateConfidence,
    updateEnjoyment,
}