import React, { useState } from "react";
import '../CSS/Flashcard.css';


const Flashcard = ({ question }) => {
    const [currentState, setCurrentState] = useState("question");

    const toggleState = () => {
        if (currentState === "question") {
            setCurrentState("answer");
        }
        else {
            setCurrentState("question");
        }
    }

    if (currentState === "question") {
        return (
            <div className="flashcard" onClick={toggleState}>
                <p>Question:</p>
                <p>{question.question}</p>
            </div>

        );
    }
    else {
        return (
            
                <div className="flashcard" onClick={toggleState}>
                    <p>Answer:</p>
                    <p>{question.answer}</p>
                </div>
            
        );
    }
}

export default Flashcard;