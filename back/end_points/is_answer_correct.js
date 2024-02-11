const express = require('express');
const { get_flashcard } = require('../lib/services/database_service');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/', async (req, res) => {
    const chatbotService = await import('../lib/services/chatbot_service.mjs');
    const chat_completion = chatbotService.chat_completion;

    let flashcard_id = req.body.flashcard_id;
    let user_answer = req.body.user_answer;
    let flashcard = await get_flashcard(flashcard_id);
    if (flashcard === -1) {
        res.status(400).send("Flashcard not found");
    }

    // console.log('Is the user answer close to the correct answer? Flashcard Question: ' + flashcard.question 
    //     + ', Flashcard Answer: ' + flashcard.answer 
    //     + ', User Answer: ' + user_answer);

    let chat_response = await chat_completion(
        'Is the user answer close to the flashcard answer? Just give True or False?'
        + ', Flashcard Answer: ' + flashcard.answer 
        + ', User Answer: ' + user_answer,
    ); 

    res.json(chat_response);
});

module.exports = app;