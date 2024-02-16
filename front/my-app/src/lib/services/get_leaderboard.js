export default async function GetLeaderboard() {
  let httpReq = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(httpReq);
  const result = await fetch("http://localhost:8080/get-leaderboard", httpReq);
  const result_json = await result.json();
  return result_json;
}
