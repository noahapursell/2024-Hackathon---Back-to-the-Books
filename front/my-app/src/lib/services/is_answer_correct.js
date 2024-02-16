export default async function isCorrect(flashcardID, userAnswer) {
    let httpReq = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "flashcard_id": flashcardID,
          "user_answer": userAnswer,
        }),
    }
    const result = await fetch("http://localhost:8080/is-answer-correct", httpReq);
    // console.log(result);
    const data = await result.json();
    return data;
  }
  