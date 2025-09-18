const {Router} = require('express');

const expenseRouter = Router();

// Local Imports
const authorize = require('../middlewares/auth.middleware');
const {createExpense, getAllExpenses, getExpenseById, updateExpenseById, deleteExpenseById} = require('../controllers/expense.controller');

expenseRouter.use(authorize);

expenseRouter.route('/')
    .post(createExpense)
    .get(getAllExpenses);

expenseRouter.route('/:id')
    .get(getExpenseById)
    .put(updateExpenseById)
    .delete(deleteExpenseById);


module.exports = expenseRouter;