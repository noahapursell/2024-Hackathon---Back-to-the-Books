export default async function FlashcardSet(id) {
    let httpReq = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "set_id": id
        }),
    }
    console.log(httpReq);
    const result = await fetch("http://localhost:8080/get-flashcard-set", httpReq);
    console.log(result);
    const data = await result.json();
    return data;
  }
  