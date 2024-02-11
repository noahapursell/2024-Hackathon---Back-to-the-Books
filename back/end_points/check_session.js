const express = require('express');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    console.log("Checking session");
    console.log(req.session);
    res.sendStatus(200);
});

module.exports = app;