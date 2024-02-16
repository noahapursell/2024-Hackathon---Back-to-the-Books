async function start_conversation() {
    const url = 'http://localhost:3000/start-conversation';
    const message = "hi!";

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message})
        });

        const message = await result.json();
        console.log(message);
        return message;
    }
    catch (error) {
        console.errer('error!', error);
    }
}


export default start_conversation;