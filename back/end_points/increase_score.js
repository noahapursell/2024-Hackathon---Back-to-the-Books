const express = require('express');
const { increase_score } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    let user_id = req.session.user_id;
    await increase_score(user_id, req.body.score_increase);
    res.sendStatus(200);
});

module.exports = app;