const {pool} = require('../configs/database');

// Get all exercises

exports.getAllExercises = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM exercises");
        res.status(200).json({message: "Exercises fetched successfully", data: rows, success: true});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message, success: false});
    }
}