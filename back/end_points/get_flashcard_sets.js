const express = require('express');
const { get_flashcard_sets } = require('../lib/services/database_service');
const { get_user_token } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.get('/', async (req, res) => {
    let id = req.session.user_id;
    const token = await get_user_token(id);
    if (token === -1) {
        res.status(401).send('Unauthorized');
        return;
    }
    let flashcards = await get_flashcard_sets(id);
    console.log(flashcards);
    res.json(flashcards);
})

module.exports = app;