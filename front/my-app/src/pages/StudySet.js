import React, { useEffect, useState } from "react";
import "../CSS/StudySet.css";
import Flashcard from "../components/Flashcard";
import { useLocation, useNavigate } from "react-router-dom";
import FlashcardSet from "../lib/services/get_flashcard_set";
import isCorrect from "../lib/services/is_answer_correct";
import IncreaseScore from "../lib/services/increase_score";

const StudySet = () => {
  const navigate = useNavigate();

  const handleClick = (address) => {
    navigate(address);
  };

  let score = 100;
  const location = useLocation();
  let setIdArray = location.pathname.split("/");
  let setId = setIdArray[setIdArray.length - 1];
  let className = setIdArray[setIdArray.length - 2];

  const [flashcardSet, setFlashcardSet] = useState([]);
  console.log("rendering comp;");
  useEffect(() => {
    const fetchData = async () => {
      console.log(setId);
      const flashcards = await FlashcardSet(setId);
      console.log(flashcards);
      setFlashcardSet(flashcards);
    };
    console.log("Loading Flashcards");
    fetchData();
  }, [className, setId]);

  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    console.log(flashcardSet[currentQuestionIndex].id, answer);

    async function f() {
      let response = await isCorrect(
        flashcardSet[currentQuestionIndex].id,
        answer
      );
      console.log(response);
      if (response === "True") {
        score += 100;
      }
    }
    f();
    // Reset answer for next question
    setAnswer("");
    // Move to next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // If we've gone through all questions, show a completion message or reset
  if (currentQuestionIndex >= flashcardSet.length) {
    IncreaseScore(score);
    return (
      <div className="main-container">
        <h1>All questions completed!</h1>
        {/* Optional: Add a button or method to reset the quiz */}
        <p className="earned-points">
          You earned {score} {score === 1 ? "point" : "points"}!
        </p>
        <div
          className="back-to-dashboard"
          onClick={() => handleClick("/Dashboard")}
          style={{ cursor: "pointer" }}
        >
          <p>Back to Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>{className} Set</h1>
      <Flashcard question={flashcardSet[currentQuestionIndex]} />
      <div className="answer">
        <p>{">"}</p>
        <textarea value={answer} onChange={handleAnswerChange}></textarea>
        <button className="submit_arrow" onClick={handleSubmitAnswer}>
          {"↑"}
        </button>
      </div>
    </div>
  );
};

export default StudySet;
