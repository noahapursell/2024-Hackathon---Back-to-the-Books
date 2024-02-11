const express = require('express');
const { add_user } = require('../lib/services/database_service');
const { set_course_summary } = require('../lib/models/course_description');
const { get_flashcard_sets } = require('../lib/services/database_service');
const { make_flashcards } = require('../lib/services/canvas_service');


const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    console.log(req.body);
    console.log(req.body.first_name);
    let user = await add_user(
        req.body.first_name,
        req.body.last_name,
        req.body.phone_number,
        req.body.email,
        req.body.password_hash,
        req.body.canvas_token
    );

    req.session.user_id = user.id;

    await set_course_summary(user.id);
    console.log("User added successfully!")
    const current_sets = await get_flashcard_sets(user.id);
    if (current_sets.length > 0) {
        res.status(200).send('Flashcard sets already exist for this user');
        return;
    }
    await make_flashcards(user.id);
    console.log("Flashcards made successfully!")

    res.sendStatus(200);
});

module.exports = app;