const {Router} = require('express');

const todoRouter = Router();

// Local Imports
const authorize = require('../middlewares/auth.middleware');
const {createTodo, getAllTodos, updateTodo, deleteTodo, getOneTodo} = require('../controllers/todo.controller');

todoRouter.use(authorize)

// Routes
todoRouter.get('/', getAllTodos);
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodo);
todoRouter.get("/:id", getOneTodo);


module.exports = todoRouter;