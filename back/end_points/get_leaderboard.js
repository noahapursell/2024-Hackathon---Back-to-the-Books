const express = require('express');
const { get_leaderboard_order } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.get('/', async (req, res) => {
    let leaderboard = await get_leaderboard_order();
    if(leaderboard === null) {
        res.sendStatus(401);
        return;
    }
    res.json(leaderboard);
});

module.exports = app;