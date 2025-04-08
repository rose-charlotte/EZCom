const dataBase_url = "https://journal-de-bord-927bb-default-rtdb.firebaseio.com";

export async function storeUser(uid: string) {
    const response = await fetch(`${dataBase_url}/user.json`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ uid }),
    });
    return response;
}

// export async function fetchOneUser(uid:string) {
//     const response = await fetch(`${dataBase_url}/user.json`)
// }

export async function storeMessages(message: string) {
    const response = await fetch(`${dataBase_url}/messages.json`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(message),
    });
    return response;
}

export async function fetchMessages() {
    const response = await fetch(`${dataBase_url}/messages.json`, {
        method: "GET",
    });

    const data = await response.json();
    const messages = [];

    for (const key in data) {
        const messageObj = {
            id: key,
            message: data[key],
        };
        messages.push(messageObj);
    }
    return messages;
}
