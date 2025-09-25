const {DataTypes} = require("sequelize");
const sequelize = require("../configs/database");

const User = sequelize.define("User", {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email must be unique in the system
        validate: {
            isEmail: true, // Validates email format
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255], // Minimum 6 characters for password
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'), // Only 2 roles allowed
        defaultValue: 'user' // Default value if not specified
    }
}, {
    tableName: "users", // Define table name in database
});

module.exports = User;