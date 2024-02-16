export default async function FlashcardSets() {
  const result = await fetch("http://localhost:8080/get-flashcard-sets", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data;
}
