
const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = ""; // Put your CLIENT access token here.

    let jokeNum = 0;

    const handleInitialize = async () => {
        return "Welcome! I tell funny jokes."
    }

    const handleReceive = async (prompt) => {
        const resp = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers: {
                "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        })
        const data = await resp.json();
        
        console.log(data)
        if (data.intents.length > 0) {
            switch(data.intents[0].name) {
                case "tell_joke": return tellJoke(data);
                case "why_chicken": return whyChicken();
            }
        }

        return "I'm sorry, I don't understand!"
   }

    const tellJoke = async (promptData) => {
        const res = await fetch(`https://v2.jokeapi.dev/joke/Any?safe-mode`)
        const jokeData = await res.json();
        jokeNum += 1;
        if (jokeData.type === 'single') {
            return `Joke #${jokeNum}: ${jokeData.joke} `;
        } else {
            return `Joke #${jokeNum}: ${jokeData.setup} ${jokeData.delivery} `;
        }
    }

   const whyChicken = async() => {
        return "To get to the other side!";
   }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;