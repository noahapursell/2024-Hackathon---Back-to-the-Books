const express = require('express');
const { add_calendar_event } = require('../lib/services/database_service');
const { get_user_token } = require('../lib/services/database_service');
const { make_courses_info } = require('../lib/services/canvas_service');
const { query_gpt } = require('../lib/services/canvas_service');
const { get_user_course_summary } = require('../lib/services/database_service');
const app = express();
app.use(express.json()); // for parsing application/json


app.post('/', async (req, res) => {

    console.log("Requesting conversation start!!!");
    const chatbotService = await import('../lib/services/chatbot_service.mjs');
    const create_agent_and_get_thread = chatbotService.create_agent_and_get_thread;
    const get_chat_response = chatbotService.get_chat_response;

    
    let user_id = req.session.user_id;
    console.log("user id", user_id);
    // const token = await get_user_token(id);
    // if (token === -1) {
    //     res.status(401).send('Unauthorized');
    //     return;
    // }
    let background = await get_user_course_summary(user_id);
    // const course_descriptions = await make_courses_info(user_id);
    // for(let course of course_descriptions){
    //     let course_content = await query_gpt(course);
    //     background += course_content+'\n';
    // }
    const { assistant_id, thread_id } = await create_agent_and_get_thread(background);
    req.session.assistant_id = assistant_id;
    req.session.thread_id = thread_id;
    console.log(assistant_id);
    console.log(thread_id);
    console.log(req.body.message);
    message = await get_user_course_summary(user_id);
    // const response = await get_chat_response(assistant_id, thread_id, req.body.message);
    const response = await get_chat_response(assistant_id, thread_id, message);

    console.log(response);
    req.session.assistant_id = assistant_id;
    req.session.thread_id = thread_id;
    res.json(response);
});

module.exports = app;