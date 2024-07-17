// api/auth.js

require('dotenv').config();

const apiKey = process.env.API_KEY;

const authenticate = (req, res, next) => {
    const requestKey = req.header('x-api-key');

    if (!requestKey || requestKey !== apiKey) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

module.exports = authenticate;
