const {Router} = require('express');

// Local Imports
const {checkGrammar} = require('../controllers/utility.controller');

const utilityRouter = Router();

utilityRouter.post("/check-grammar", checkGrammar);

module.exports = utilityRouter;