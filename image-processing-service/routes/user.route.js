const {Router} = require('express');

// Local Imports
const {authorize} = require('../middlewares/auth.middleware');
const {getUserProfile} = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/profile', authorize, getUserProfile);

module.exports = userRouter;