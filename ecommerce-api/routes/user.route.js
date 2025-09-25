const {Router} = require('express');

// Local imports
const {register, login, getProfile} = require('../controllers/user.controller');
const {authorize} = require('../middlewares/auth.middleware');

const userRouter = Router();


userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/profile", authorize, getProfile);

module.exports = userRouter;