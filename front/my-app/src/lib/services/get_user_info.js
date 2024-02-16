export default async function GetUser() {
    let httpReq = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
    }
    console.log(httpReq);
    const result = await fetch("http://localhost:8080/get-user-info", httpReq);
    const result_data = await result.json();
    console.log(result);
    return result_data;
  }
  