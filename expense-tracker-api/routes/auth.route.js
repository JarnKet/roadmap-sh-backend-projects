const {Router} = require('express');

const authRouter = Router();

// Controllers
const {register, login} = require('../controllers/auth.controller');

// Routes

authRouter.post('/register', register);
authRouter.post('/login', login);


module.exports = authRouter;