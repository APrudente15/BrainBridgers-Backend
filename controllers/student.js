const bcrypt = require('bcrypt');

const Student = require('../models/Student');
const Token = require('../models/Token');

const login = async (req, res) => {
    const data = req.body;

    if (!data.username || !data.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const student = await Student.getOneByUsername(data.username);
        console.log('student:', student);
        const authenticated = await bcrypt.compare(data.password, student.password);
        console.log('authenticated:', authenticated);
        if (!authenticated) {
            return res.status(401).json({ error: 'Invalid username or password' });
        } else {
            const token = await Token.create(student.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
    } catch (error) {
        console.error('Error in `controllers/student.login`:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login,
};

