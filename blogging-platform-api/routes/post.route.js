const {Router} = require('express');

const {getAllPosts, getPostById,createPost, updatePost, deletePost} = require('../controller/post.controller');

const postRouter = Router();

postRouter.get('/', getAllPosts);

postRouter.get('/:id', getPostById);

postRouter.post('/', createPost);

postRouter.put('/:id', updatePost);

postRouter.delete('/:id', deletePost);

module.exports = postRouter;