const express = require('express');
const { get_assignments } = require('../lib/services/canvas_service');
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
    let events = await get_assignments(token);
    res.json(events);
})

module.exports = app;