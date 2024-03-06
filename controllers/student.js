const bcrypt = require('bcrypt');

const Student = require('../models/Student');
const Token = require('../models/Token');

const login = async (req, res) => {
    const data = req.body;

    if (!data.username || !data.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Will throw an error here if username is not found
        const student = await Student.getOneByUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, student.password);
        if (!authenticated) {
            return res.status(401).json({ authenticated: false, message: 'Invalid username or password' });
        } else {
            const token = await Token.create(student.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
    } catch (error) {
        console.error('Error in `controllers/student.login`:', error);
        if (error.code === 'NO_STUDENT_FOUND') {
            // If ther username is not found, the error is caught here
            console.log('No student found');
            return res.status(401).json({ authenticated: false, message: 'Invalid username or password' });
        }
        res.status(500).json({ error: error.message });
    }
};

const getMe = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const student = await Token.getStudentByToken(token);
        // Remove the password property from the student object before sending it to the client
        delete student.password;
        res.status(200).json({ student: student });
    } catch (error) {
        console.error('Error in `controllers/student.me`:', error);
        if (error.code === 'NO_TOKEN_FOUND') {
            console.log('No token found');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login,
    getMe,
};

