const {Router} = require('express');
const {authorize} = require('../middlewares/auth.middleware');
const {createCheckoutSession, } = require('../controllers/payment.controller');

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session", authorize, createCheckoutSession);

module.exports = paymentRouter;