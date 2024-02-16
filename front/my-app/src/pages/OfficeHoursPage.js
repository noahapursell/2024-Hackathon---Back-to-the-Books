import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/OfficeHoursPage.css';
import ScrollableBox from '../components/ScrollableBox.js';
import ScrollableInputBox from '../components/ScrollableInputBox.js'
// import start_conversation  from '../lib/services/chat_bot_service';
const OfficeHoursPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [responses, updateResponses] = useState([]);

    async function continue_conversation(user_message) {
        console.log("continueing conversation");
        const url = "http://localhost:8080/continue-conversation";
        const result = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"message": user_message})
        });
        const message = await result.json()
        console.log('message', message);
        return message;
    }

    async function start_conversation() {
        if (isLoading) {
            return;
        }
        setLoading(true);
        const url = 'http://localhost:8080/start-conversation';
        const user_message = "hi!";
        const result = await fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "message": user_message })
        });

        const message = await result.json();
        console.log(message);
        return message;


    }
    const begin_conversation = async () => {
        const message = await start_conversation();
        console.log(message);
        const message_object = { 'speaker': 'Professor', 'message': message }
        updateResponses(prevList => prevList.concat(message_object));
    }

    if (responses.length < 1) {
        begin_conversation();
    }

    const [question, updateQuestion] = useState('')
    console.log(question);
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        // console.log(inputValue);
        updateQuestion(inputValue);
    }

    const handleNewResponse = (response) => {
        const new_entry = { "speaker": "Professor", "message": "response" }
        updateResponses(prevList => prevList.concat(response));
    }

    const handleUserSubmit = async (response) => {
        console.log('User submited', question);
        const user_message = { "speaker": 'user', 'message': question };
        updateResponses(prevList => prevList.concat(user_message));
        const return_message = await continue_conversation(question);
        console.log(return_message);
        const return_message_object = {"speaker": "Professor", "message": return_message};
        updateResponses(prevList => prevList.concat(return_message_object));
    }




    return (
        <div className="office-hours-outer-container">
            <div className="office-hours-title">
                <h1>OFFICE HOURS</h1>
            </div>
            <div className="office-hours-output-box">
                <ScrollableBox responseList={responses} />
            </div>
            <div className="office-hours-input-box">
                <p>{'>'}</p>
                <ScrollableInputBox onChange={handleInputChange} />
                <button onClick={handleUserSubmit}>{"↑"}</button>
                {/* <input type="text" value={question[0]} onChange={(e) => handleInputChange(0, e.target.value)}/> */}
            </div>
        </div>
    );
}

export default OfficeHoursPage;