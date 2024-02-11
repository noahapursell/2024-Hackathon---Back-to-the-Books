const express = require('express');
require("dotenv").config();

const app = express();
const port = process.env.WEB_SERVER_PORT

//CORS
app.set("trust proxy", 1);
const cors = require('cors');
app.use(cors({
    origin: process.env.WEB_SERVER_ORIGIN,
    credentials: true
}));

//Express-Sessions
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

//API Endpoints

// tutor chatbot
const start_conversation = require('./end_points/start_conversation');
app.use('/start-conversation', start_conversation);
const continue_conversation = require('./end_points/continue_conversation');
app.use('/continue-conversation', continue_conversation);

//Check Session
const check_session = require('./end_points/check_session');
app.use('/check-session', check_session);

//Calendar
const get_calendar_events = require('./end_points/get_calendar_events');
app.use('/get-calendar-events', get_calendar_events);
const add_calendar_event = require('./end_points/add_calendar_event');
app.use('/add-calendar-event', add_calendar_event);
const remove_calendar_event = require('./end_points/remove_calendar_event');
app.use('/remove-calendar-event', remove_calendar_event);

//Flashcards
const add_flashcard_set = require('./end_points/add_flashcard_set');
app.use('/add-flashcard-set', add_flashcard_set);
const get_flashcard_sets = require('./end_points/get_flashcard_sets');
app.use('/get-flashcard-sets', get_flashcard_sets);
const get_flashcard_set = require('./end_points/get_flashcard_set');
app.use('/get-flashcard-set', get_flashcard_set);
const remove_flashcard_set = require('./end_points/remove_flashcard_set');
app.use('/remove-flashcard-set', remove_flashcard_set);
const add_flashcard = require('./end_points/add_flashcard');
app.use('/add-flashcard', add_flashcard);
const make_flashcard_sets_from_canvas = require('./end_points/make_flashcard_sets_from_canvas');
app.use('/make-flashcard-sets-from-canvas', make_flashcard_sets_from_canvas);
const is_answer_correct = require('./end_points/is_answer_correct');
app.use('/is-answer-correct', is_answer_correct);

//Auth
const add_user = require('./end_points/add_user');
app.use('/add-user', add_user);
const login = require('./end_points/login');
app.use('/login', login);

//User Info
const get_user_info = require('./end_points/get_user_info');
app.use('/get-user-info', get_user_info);
const increase_score = require('./end_points/increase_score');
app.use('/increase-score', increase_score);

//Leaderboard
const get_leaderboard = require('./end_points/get_leaderboard');
app.use('/get-leaderboard', get_leaderboard);

//Home Page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_IP, 
    dialect: 'mysql',
    port: process.env.DATABASE_PORT
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });