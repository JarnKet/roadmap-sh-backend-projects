const db = require('../models');

// Create Todo Controller
async function createTodo(req, res) {
    try {

        // 1. Get Data from req.body
        const {title, description} = req.body;
        const userId = req.user.userId; // Get userId from the authenticated user (from middleware)

        // 2. Validate Data
        if (!title) {
            return res.status(400).json({
                message: 'Title are required',
                success: false,
            });
        }


        //     3. Create Todo
        const todo = await db.Todo.create({
            title,
            description,
            userId
        })

        //     4. Return Response with Data
        res.status(201).json({
            message: "Todo created successfully",
            success: true,
            data: todo,
        })


    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: "Internal Server Error",
            success: false
        });
    }
}

// Get All Todos Controller
async function getAllTodos(req, res) {
    try {
        const userId = req.user.userId; // Get userId from the authenticated user (from middleware)

        // Fetch all todos for the user
        const todos = await db.Todo.findAll({
            where: {userId}
        });

        res.status(200).json({
            message: "Todos fetched successfully",
            success: true,
            data: todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false
        });
    }
}

// Update todo

async function updateTodo(req, res) {
    try {

        // 1. Get Data from req.body
        const {id} = req.params; // Get todo ID from request parameters
        const {title, description, completed} = req.body;
        const userId = req.user.userId; // Get userId from the authenticated user (from middleware)


        //     2. Validate Data
        if (!title) {
            return res.status(400).json({
                message: 'Title is required',
                success: false,
            });
        }

        //     3. Find Todo
        const todo = await db.Todo.findOne({
            where: {id}
        })

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            });

        }


        //     4. Check if the todo belongs to the user
        if (todo.userId !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this todo",
                success: false
            });
        }


        //     5. Update Todo
        todo.title = title;
        todo.description = description;
        todo.completed = completed !== undefined ? completed : todo.completed; // Only update completed if provided
        await todo.save();

        //     6. Return Response with Data
        res.status(200).json({
            message: "Todo updated successfully",
            success: true,
            data: todo,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json(
            {
                message: "Internal Server Error",
                success: false
            }
        )
    }
}

// Delete Todo Controller

async function deleteTodo(req, res){
    try{

        // 1. Get Data from req.params
        const {id} = req.params;
        const userId = req.user.userId; // Get userId from the authenticated user (from middleware)

        // 2. Find Todo
        const todo = await db.Todo.findOne({
            where: {id}
        })

        if(!todo){
            return res.status(404).json({
                message: "Todo not found",
                success: false
            });
        }

        // 3. Check if the todo belongs to the user
        if(todo.userId !== userId){
            return res.status(403).json({
                message: "You are not authorized to delete this todo",
                success: false
            });
        }

        // 4. Delete Todo
        await todo.destroy();

        // 5. Return Response with Data
        res.status(200).json({
            message: "Todo deleted successfully",
            success: true,
        });

    }catch (error){
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

// Get One Todo Controller

async function getOneTodo(req, res) {
    try {
        const {id} = req.params; // Get todo ID from request parameters
        const userId = req.user.userId; // Get userId from the authenticated user (from middleware)

        // Find Todo
        const todo = await db.Todo.findOne({
            where: {id, userId} // Ensure the todo belongs to the user
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Todo fetched successfully",
            success: true,
            data: todo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false
        });
    }
}

module.exports = {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
    getOneTodo
}