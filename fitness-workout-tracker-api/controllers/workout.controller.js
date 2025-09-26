const {pool} = require('../configs/database');

// Create a workout
exports.createWorkout = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        // Start transaction
        await connection.beginTransaction();

        // 1. Get user id from req.user
        const {name, description, exercises} = req.body;
        const userId = req.user.userId;

        // 2. Validate input
        if (!name || !description || !Array.isArray(exercises)) {
            return res.status(400).json({
                message: "Name, description and exercises are required", success: false,
            });
        }

        // Validate exercise structure
        for (const ex of exercises) {
            if (!ex.exercise_id || !ex.sets || !ex.reps) {
                return res.status(400).json({
                    message: "Each exercise must have exercise_id, sets, and reps", success: false,
                });
            }
        }

        // 3. Insert workout into database
        const [workoutResult] = await connection.query('INSERT INTO workouts (user_id, name, description) VALUES (?, ?, ?)', [userId, name, description]);

        const workoutId = workoutResult.insertId;

        // 4. Insert exercises into database
        if (exercises.length > 0) {
            const exerciseValues = exercises.map(ex => [workoutId, ex.exercise_id, ex.sets, ex.reps, ex.weight || null]);

            await connection.query('INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, weight) VALUES ?', [exerciseValues]);
        }

        // Commit transaction
        await connection.commit();

        // 5. Return success response
        res.status(201).json({
            message: "Workout created successfully", success: true, data: {
                workoutId,
            }
        });
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();

        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        });
    } finally {
        // Always release connection
        connection.release();
    }
};

// Get all workouts for a user
exports.getWorkouts = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [workouts] = await pool.query('SELECT id, name, description, created_at FROM workouts WHERE user_id = ? ORDER BY created_at DESC', [userId]);

        res.status(200).json({
            message: "Workouts fetched successfully", success: true, data: workouts,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        });
    }
}

// Get One workout for a user
exports.getWorkout = async (req, res) => {
    try {
        // 1. Get Data
        const userId = req.user.userId;
        const {id} = req.params;


        //     2. query the data
        const query = `
            SELECT w.id   AS workout_id,
                   w.name AS workout_name,
                   w.description,
                   we.sets,
                   we.reps,
                   we.weight,
                   e.id   AS exercise_id,
                   e.name AS exercise_name
            FROM workouts w
                     JOIN workout_exercises we ON w.id = we.workout_id
                     JOIN exercises e ON we.exercise_id = e.id
            WHERE w.id = ?
              AND w.user_id = ?;
        `;

        const [rows] = await pool.query(query, [id, userId]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Workout not found", success: false,
            });
        }

        const workoutDetail = {
            id: rows[0].workout_id,
            name: rows[0].workout_name,
            description: rows[0].description,
            exercises: rows.map(row => ({
                exercise_id: row.exercise_id,
                name: row.exercise_name,
                sets: row.sets,
                reps: row.reps,
                weight: row.weight
            }))
        }

        res.status(200).json({
            message: "Workout fetched successfully", success: true, data: workoutDetail,
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        })
    }
}


// Update the workout
exports.updateWorkout = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        connection.beginTransaction();

        // 1. Get Data
        const userId = req.user.userId;
        const {id: workoutId} = req.params;
        const {name, description, exercises} = req.body;

        // 2.Basic validation
        if (!name || !exercises || !Array.isArray(exercises)) {
            return res.status(400).json({message: 'Name and a list of exercises are required.'});
        }

        //  3. Update the main workout details.
        //Also verifies that the workout belongs to the user.
        const [updateResult] = await connection.query(
            'UPDATE workouts SET name = ?, description = ? WHERE id = ? AND user_id = ?',
            [name, description, workoutId, userId]
        );

        // If no rows were affected, the workout doesn't exist or belong to the user.
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({message: 'Workout not found or access denied.'});
        }

        // 4. Delete all existing exercises for this workout.
        await connection.query('DELETE FROM workout_exercises WHERE workout_id = ?', [workoutId]);


        // 5. Insert the new list of exercises.
        if (exercises.length > 0) {
            const exerciseValues = exercises.map(ex =>
                [workoutId, ex.exercise_id, ex.sets, ex.reps, ex.weight]
            );
            await connection.query(
                'INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, weight) VALUES ?',
                [exerciseValues]
            );
        }

        // 6. Commit the transaction.
        await connection.commit();

        res.status(200).json({message: 'Workout updated successfully.'});


    } catch (error) {
        await connection.rollback();
        res.status(500).json({message: 'Internal Server Error', error: error.message, success: false});
    } finally {
        connection.release();
    }
}

// Delete a workout
exports.deleteWorkout = async (req, res) => {
    try{
        const {id: workoutId} = req.params;
        const userId = req.user.userId;


        const [result] = await pool.query(
            'DELETE FROM workouts WHERE id = ? AND user_id = ?',
            [workoutId, userId]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Workout not found or access denied.', success: false});
        }

        res.status(200).json({message: 'Workout deleted successfully.', success: true});

    }catch (error){
        res.status(500).json({message: 'Internal Server Error', error: error.message, success: false});
    }

}
