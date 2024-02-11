const express = require('express');
const { authenticate_user } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    console.log("Attempting to login");
    let user_id = await authenticate_user( req.body.email, req.body.password_hash);
    if(user_id === -1){
        res.sendStatus(401);
        return;
    }
    console.log(user_id);
    req.session.user_id = user_id;
    console.log(req.session);
    res.sendStatus(200);
});

module.exports = app;