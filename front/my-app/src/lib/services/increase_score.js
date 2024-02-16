export default async function IncreaseScore(score) {
    let httpReq = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "score_increase": score
        }),
    }
    console.log(httpReq);
    const result = await fetch("http://localhost:8080/increase-score", httpReq);
    console.log(result);
    //const data = await result.json();
    //return data;
  }
  