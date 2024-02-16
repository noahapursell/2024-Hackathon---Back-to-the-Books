import React, { useState, useEffect } from "react";
import "../CSS/StudyPage.css";
import SetsScrollableBox from "../components/SetsScrollableBox.js";
import FlashcardSets from "../lib/services/get_flashcard_sets.js";

const StudyPage = () => {
  //  let flashcardSets = await FlashcardSets();
  const [flashcardSets, setFlashcardSets] = useState([]);
    //console.log('rendering comp;');
  useEffect(() => {
    const fetchData = async () => {
      const flashcards = await FlashcardSets();
      console.log(flashcards);
      setFlashcardSets(flashcards);
    };
    //console.log("Loading Flashcards");
    fetchData();
  }, []);

  if (!flashcardSets) {
    return (<>
        loading...
    </>);
  }

  return (
    <div className="page-container">
      <h1>STUDY SETS</h1>
      <SetsScrollableBox responseList={flashcardSets} />
    </div>
  );
};

export default StudyPage;
