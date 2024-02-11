require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_IP, // replace with the IP address
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    logging: false
});

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    canvas_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    course_summary: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

const calendar_events = sequelize.define('calendar_events', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
})

const flashcard_sets = sequelize.define('flashcard_sets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

const flashcards = sequelize.define('flashcards', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});



users.hasMany(calendar_events, { foreignKey: 'user_id' });
users.hasMany(flashcard_sets, { foreignKey: 'user_id' });
flashcard_sets.hasMany(flashcards, { foreignKey: 'flashcard_set_id' });


sequelize.sync({ force: false })

module.exports = {
    users,
    calendar_events,
    flashcard_sets,
    flashcards
}