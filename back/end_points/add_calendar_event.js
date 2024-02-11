const express = require('express');
const { add_calendar_event } = require('../lib/services/database_service');
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
    let event = req.body.event;
    add_calendar_event(id, event.title, event.description, event.start_time, event.end_time);
    res.sendStatus(200);
})

module.exports = app;