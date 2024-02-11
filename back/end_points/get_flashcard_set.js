const express = require('express');
const { get_flashcard_set } = require('../lib/services/database_service');
const { get_user_token } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    console.log(req.body.set_id);
    let flashcards = await get_flashcard_set(req.body.set_id);
    res.json(flashcards);
})

module.exports = app;