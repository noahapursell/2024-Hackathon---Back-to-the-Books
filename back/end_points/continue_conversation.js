const express = require('express');
const { add_calendar_event } = require('../lib/services/database_service');
const { get_user_token } = require('../lib/services/database_service');



const app = express();
app.use(express.json()); // for parsing application/json
app.post('/', async (req, res) => {
    console.log("Continu conversation");
    const chatbotService = await import('../lib/services/chatbot_service.mjs');
    const create_agent_and_get_thread = chatbotService.create_agent_and_get_thread;
    const get_chat_response = chatbotService.get_chat_response;
    const message = req.body.message;

    const response = await get_chat_response(req.session.assistant_id, req.session.thread_id, message);
    console.log(response);
    res.json(response);
});

module.exports = app;