import OpenAI from 'openai';
import dotenv from 'dotenv';
import { add_flashcard, add_flashcard_set } from '../services/database_service.js';
dotenv.config();


const functions = [
    {
        "name": "create_flaschard",
        "description": "Create a flashcard",
        "parameters": [
            { "type": "string", "name": "question" },
            { "type": "string", "name": "answer" }
        ]
    }
]


const api_key = process.env.OPENAI_API_KEY;
console.log(api_key);
const openai = new OpenAI({
    apiKey: api_key // This is also the default, can be omitted
});

async function create_agent_and_get_thread(class_background) {
    const instructions = `You are a personal tutor in a retro chatbot app named 'the professor'. You are going to talk to a student and use sochratic questioning to help them understand the material. You will be given a description of the student's current classes. Feel free to introduce yourself, and ask the student about their classes. Try to keep your answers short and concise. Feel free to answer with a question. `;
    console.log(instructions);
    const assistant = await openai.beta.assistants.create({
        instructions: instructions, 
        name: "Math Tutor",
        tools: [],
        model: "gpt-3.5-turbo",
    });
    const thread = await openai.beta.threads.create();

    return { "assistant_id": assistant.id, "thread_id": thread.id };
}

async function get_chat_response(assistant_id, thread_id, user_message) {
    console.log(assistant_id);
    console.log(thread_id);
    console.log(user_message);
    const message = await openai.beta.threads.messages.create(
        thread_id,
        {
            role: "user",
            content: user_message,
        }
    );
    const run = await openai.beta.threads.runs.create(
        thread_id,
        {
            assistant_id: assistant_id,
        }
    );
    const run_id = run.id;
    let run_status = run.status;
    while (run_status !== 'completed') {
        const run = await openai.beta.threads.runs.retrieve(thread_id, run_id);
        run_status = run.status;
        // console.log(run);
    }

    const messages = await openai.beta.threads.messages.list(
        thread_id
    );
    console.log(messages);
    return messages.data[0].content[0].text.value;
}



function convert_string_to_json(strWithTripleQuotes) {
    // Remove triple quotes from the start and end of the string
    const cleanedStr = strWithTripleQuotes.replace(/^"""/, '').replace(/"""$/, '');

    try {
        const jsonObj = JSON.parse(cleanedStr);
        return jsonObj;
    } catch (error) {
        console.error("Error parsing JSON string:", error);
        return null; // or handle the error as needed
    }
}

async function chat_completion(message) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: 'user', content: message }
        ],
        model: "gpt-4",
    });
    return completion.choices[0].message.content;
}

async function make_flashcard_set_from_class_content(user_id, class_content, course_name) {
    console.log('making flashcard set for class content: ', class_content);
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant who makes flashcard sets for students." },
            {
                role: 'user', content: `Make 5 flashcards based on this content. Dont make the questions too simplistic. Make the questions more about the broader subject itself. For example, if it is a cal class, ask about common calc concepts: ${class_content}.
            Create flashcards by creating json objects for the following function: ${functions[0]}. 
            Write you reponse by doing triple quotes, then a list of the json objects. Say nothing else but the triple quotes and the function call. DO NOT EXPLAIN YOUR REASONING. Only write the JSON. Here is an example:
            """[
                {"front": "What is a cell?", "back": "A basic unit of life that can carry out all the processes necessary for life."},
                {"front": "What is the function of the nucleus?", "back": "To store the genetic material (DNA) of the cell and control its activities."}
            ]""" ` },
        ],
        model: "gpt-4",
    });

    const flashcard_set_id = await add_flashcard_set(user_id, course_name, course_name, false);

    const flashcard_json = convert_string_to_json(completion.choices[0].message.content);
    flashcard_json.forEach(async (flashcard) => {
        console.log(flashcard);
        await add_flashcard(flashcard_set_id, flashcard.front, flashcard.back);

    });

    return flashcard_set_id;
}

async function test() {
    console.log(await make_flashcard_set_from_class_content(1, "Biology class about cells and DNA"));
    // console.log(await chat_completion("I am having trouble with my homework in C S 1313"));
    // const class_background = "You are currently taking C S 1313, C S 1323, and MATH 1513";
    // const { assistant_id, thread_id } = await create_agent_and_get_thread(class_background);
    // const user_message = "I am having trouble with my homework in C S 1313";
    // const response = await get_chat_response(assistant_id, thread_id, user_message);
    // console.log(response);
    // const response2 = await get_chat_response(assistant_id, thread_id, "What is the homework about?");
    // console.log(response2);
}

//test();

export { create_agent_and_get_thread,
         get_chat_response,
         chat_completion,
        make_flashcard_set_from_class_content,
 };