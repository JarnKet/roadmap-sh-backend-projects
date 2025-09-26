const {Router} = require('express');

// Locals Imports
const {register, login, getProfile} = require('../controllers/auth.controller');
const {authorize} = require('../middlewares/auth.middleware');

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', authorize, getProfile);

module.exports = authRouter;