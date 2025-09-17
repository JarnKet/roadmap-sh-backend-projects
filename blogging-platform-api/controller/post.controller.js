const dbPool = require('../configs/db');

// Get all blog posts
async function getAllPosts(req, res) {
    try {
        const {term} = req.query; // Get search term from query parameter

        let sql = 'SELECT * FROM posts ORDER BY createdAt DESC';

        const params = [];

        if (term) {
            sql = 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? OR category LIKE ? ORDER BY  createdAt DESC';
            const searchTerm = `%${term}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        const [rows] = await dbPool.execute(sql, params);

        res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully.',
            data: rows,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving posts.',
            error: error.message,
        })
    }
}

// Get One blog post by ID
async function getPostById(req, res) {
    try {
        const {id} = req.params;

        const [rows] = await dbPool.execute('SELECT * FROM posts WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post not found.',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Post retrieved successfully.',
            data: rows[0],
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the post.',
            error: error.message,
        })
    }
}


// Create a new blog post
async function createPost(req, res) {
    try {

        const {title, content, category, tags} = req.body

        // Simple validation
        if (!title || !content) {
            return res.status(400).json({message: 'Title and content are required.'});
        }

        const sql = 'INSERT INTO posts (title, content, category, tags) VALUES (?, ?, ?, ?)';

        // tags need to be a JSON string to be stored in the JSON column
        const tagsJson = JSON.stringify(tags || [])

        const [result] = await dbPool.execute(sql, [title, content, category, tagsJson]);

        // Respond with the newly created post
        const [rows] = await dbPool.execute('SELECT * FROM posts WHERE id = ?', [result.insertId]);
        res.status(201).json({
            success: true,
            message: 'Post created successfully.',
            data: rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the post.',
            error: error.message,
        })
    }
}

// Update a blog post by ID

async function updatePost(req, res) {

    try {
        const {id} = req.params;

        const {title, content, category, tags} = req.body;


        //     Simple Validation
        if (!title || !content) {
            return res.status(400).json({success: false,message: 'Title and content are required.'});
        }


        const sql = 'UPDATE posts SET title = ?, content = ?, category = ?, tags = ? WHERE id = ?';
        const tagsJson = JSON.stringify(tags || [])

        const [result] = await dbPool.execute(sql, [title, content, category, tagsJson, id]);

        if (result.affectedRows === 0){
            return res.status(404).json({success: false,message: 'Post not found.'});
        }

        const [rows] = await dbPool.execute('SELECT * FROM posts WHERE id = ?', [id]);
        res.status(200).json({
            success: true,
            message: 'Post updated successfully.',
            data: rows[0],
        });
    } catch (error) {

    }

}


// Delete a blog post by ID
async function deletePost(req, res) {
    try{
        const {id} = req.params;

        const sql = 'DELETE FROM posts WHERE id = ?';
        const [result] = await dbPool.execute(sql, [id]);

        if (result.affectedRows === 0){
            return res.status(404).json({
                success: false,
                message: 'Post not found.',
            });
        }


        res.status(200).json({
            success: true,
            message: 'Post deleted successfully.',
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the post.',
            error: error.message,
        })
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}