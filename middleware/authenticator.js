const Token = require('../models/Token');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        else {
            // Check the token actually exists in the database
            await Token.getOneByToken(token);
            next();
        }
    } catch (error) {
        if (error.code === 'NO_TOKEN_FOUND') {
            console.log('No token found');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.error('Error in `middleware/authenticator`:', error);
        res.status(500).json({ error: error.message });
    }
}