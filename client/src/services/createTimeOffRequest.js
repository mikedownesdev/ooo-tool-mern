import { API_BASE_URL } from "../config";

export async function createTimeOffRequest(newRequestData) {

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const accessToken = user.accessToken;
    console.log('accessToken', accessToken)

    const response = await fetch(`${API_BASE_URL}/requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
        body: JSON.stringify(newRequestData),
    })

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data
}
