const {Op} = require('sequelize');

// Local Imports
const db = require('../models');

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private
async function createExpense(req, res) {
    try{
        // 1. Extract expense details from request body
        const {category, amount, date} = req.body

        // 2. Validate the input date
        if (!category || !amount || !date){
            return res.status(400).json({message: 'Category, Amount and Date are required', success: false});
        }

    //     3. Create a new expense record in the database
        const newExpense = await db.Expense.create({
            category,
            amount,
            date,
            userId: req.user.id
        });

    //     4. Send a success response with the created expense
        res.status(201).json({message: 'Expense created successfully', success: true, data: newExpense});
    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', success: false});
    }
}


// @desc    Get all expenses for the logged-in user with filtering
// @route   GET /api/expenses
// @access  Private
async function getAllExpenses(req, res) {
    try{
        const {filter, startDate, endDate} = req.query;
        const whereClause = {userId: req.user.id};

        // Date Filtering Logic
        if (filter){
            const today = new Date();
            today.setHours(0,0,0,0); // Set to start of day

            let dateFrom;

            switch (filter) {
                case "week":
                    dateFrom = new Date(today.setDate(today.getDate() -7));
                    break;
                case "month":
                    dateFrom = new Date(today.setMonth(today.getMonth() -1));
                    break;
                case 'last3months':
                    dateFrom = new Date(today.setMonth(today.getMonth() - 3));
                    break;
                case 'custom':
                    if (startDate && endDate) {
                        whereClause.date = { [Op.between]: [startDate, endDate] };
                    }
                    break;
                default:
                    break;
            }

            if (dateFrom){
                whereClause.date = {[Op.gte]: dateFrom}
            }
        }

        const expenses = await db.Expense.findAll({
            where: whereClause,
            order: [['date', 'DESC']]
        })


        res.status(200).json({message: 'Expenses fetched successfully', success: true, data: expenses});

    }catch (error){
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', success: false});
    }
}


// @desc    Get a single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
async function getExpenseById(req, res) {
    try{
        const expenseId = req.params.id;

        const expense = await db.Expense.findOne({
            where: {
                id: expenseId,
                userId: req.user.id
            }
        });

        if (!expense){
            return res.status(404).json({message: 'Expense not found', success: false});
        }

        res.status(200).json({message: 'Expense fetched successfully', success: true, data: expense});
    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', success: false});
    }
}

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
async function updateExpenseById(req, res) {
    try{
        const expenseId = req.params.id;
        const {category, amount, date} = req.body;

    //     1. Find the expense by ID and ensure it belongs to the logged-in user
        const expense = await db.Expense.findOne({
            where: {
                id: expenseId,
                userId: req.user.id
            }
        });

        if (!expense){
            return res.status(404).json({message: 'Expense not found', success: false});
        }

    //     2. Update the expense details
        expense.category = category || expense.category;
        expense.amount = amount || expense.amount;
        expense.date = date || expense.date;

        await expense.save();

    //     3. Send a success response with the updated expense
        res.status(200).json({message: 'Expense updated successfully', success: true, data: expense});

    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', success: false});
    }
}


// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
async function deleteExpenseById(req, res) {
    try{
        const expenseId = req.params.id;

    //     1. Find the expense by ID and ensure it belongs to the logged-in user
        const expense = await db.Expense.findOne({
            where: {
                id: expenseId,
                userId: req.user.id
            }
        });

        if (!expense){
            return res.status(404).json({message: 'Expense not found', success: false});
        }

    //     2. Delete the expense
        await expense.destroy();

    //     3. Send a success response
        res.status(200).json({message: 'Expense deleted successfully', success: true});
    }catch (error) {
        console.error(error);

        res.status(500).json({message: 'Internal Server Error', success: false});
    }
}

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById
};