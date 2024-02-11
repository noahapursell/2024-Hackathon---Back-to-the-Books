const express = require('express');
const { get_user_info } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.get('/', async (req, res) => {
    let user_id = req.session.user_id;
    let user_info = await get_user_info(user_id);
    if(user_info === null) {
        res.sendStatus(401);
        return;
    }
    res.json(user_info);
});

module.exports = app;