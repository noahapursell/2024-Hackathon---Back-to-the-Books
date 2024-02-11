const express = require('express');
const { add_flashcard_set } = require('../lib/services/database_service');
const { get_user_token } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    let id = req.session.user_id;
    const token = await get_user_token(id);
    if (token === -1) {
        res.status(401).send('Unauthorized');
        return;
    }
    add_flashcard_set(id, req.body.title, req.body.description);
    res.sendStatus(200);
})

module.exports = app;