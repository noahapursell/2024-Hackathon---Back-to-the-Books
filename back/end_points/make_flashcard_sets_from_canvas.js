const express = require('express');
const { get_flashcard_sets } = require('../lib/services/database_service');
const { make_flashcards } = require('../lib/services/canvas_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    // let id = req.session.user_id;
    let user_id = req.session.user_id;
    const current_sets = await get_flashcard_sets(user_id);
    if (current_sets.length > 0) {
        res.status(200).send('Flashcard sets already exist for this user');
        return;
    }
    await make_flashcards(user_id);
    res.sendStatus(200);
})

module.exports = app;