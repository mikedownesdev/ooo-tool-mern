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

export async function fetchRequestById(requestId) {

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const accessToken = user.accessToken;

    const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
    })

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data
}

export async function fetchMyRequests() {
    console.log('fetchMyRequests')
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const accessToken = user.accessToken;

    const response = await fetch(`${API_BASE_URL}/requests/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
    })

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data
}

export async function modifyRequest(requestId, updatedRequestData) {

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const accessToken = user.accessToken;

    const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
        body: JSON.stringify(updatedRequestData),
    })

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data
}
