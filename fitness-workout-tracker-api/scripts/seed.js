const mysql = require('mysql2/promise');

// Local Imports
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/env');

const exercisesToSeed = [
    { name: 'Bench Press', description: 'A compound exercise for the chest, shoulders, and triceps.', category: 'Strength', muscle_group: 'Chest' },
    { name: 'Squat', description: 'A compound exercise that targets the thighs, hips, and buttocks.', category: 'Strength', muscle_group: 'Legs' },
    { name: 'Deadlift', description: 'A compound exercise that works the entire posterior chain.', category: 'Strength', muscle_group: 'Back' },
    { name: 'Overhead Press', description: 'A compound exercise for the shoulders and upper body.', category: 'Strength', muscle_group: 'Shoulders' },
    { name: 'Pull-up', description: 'An upper-body exercise that works the back and biceps.', category: 'Strength', muscle_group: 'Back' },
    { name: 'Barbell Row', description: 'A compound exercise for the middle back.', category: 'Strength', muscle_group: 'Back' },
    { name: 'Leg Press', description: 'A machine-based exercise for the quadriceps.', category: 'Strength', muscle_group: 'Legs' },
    { name: 'Dumbbell Curl', description: 'An isolation exercise for the biceps.', category: 'Strength', muscle_group: 'Biceps' },
    { name: 'Tricep Extension', description: 'An isolation exercise for the triceps.', category: 'Strength', muscle_group: 'Triceps' },
    { name: 'Running', description: 'A cardiovascular exercise.', category: 'Cardio', muscle_group: 'Full Body' },
    { name: 'Cycling', description: 'A low-impact cardiovascular exercise.', category: 'Cardio', muscle_group: 'Legs' },
    { name: 'Yoga', description: 'A practice involving physical postures, breathing techniques, and meditation.', category: 'Flexibility', muscle_group: 'Full Body' },
    { name: 'Plank', description: 'An isometric core strength exercise.', category: 'Strength', muscle_group: 'Core' }
];

async function seedDatabase() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        });
        console.log('Connected to the database.');

        // Clear existing exercises to prevent duplicates on re-running the seed
        await connection.query('DELETE FROM exercises');
        console.log('Cleared existing exercises.');

        console.log('Seeding new exercises...');
        for (const exercise of exercisesToSeed) {
            await connection.query(
                'INSERT INTO exercises (name, description, category, muscle_group) VALUES (?, ?, ?, ?)',
                [exercise.name, exercise.description, exercise.category, exercise.muscle_group]
            );
            console.log(`- Added ${exercise.name}`);
        }

        console.log('✅ Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed.');
        }
    }
}

seedDatabase();