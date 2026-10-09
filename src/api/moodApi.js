const API_URL = "http://localhost:8000/api";

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((item) => 
        item.startsWith(`${name}=`)
);
    return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
}

export async function initializeCsrf() {
    const response = await fetch(`${API_URL}/csrf/`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch CSRF protection token");
    }
}

export async function getMoodEntries() {
    const response = await fetch(`${API_URL}/moods/`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Unable to load moods: ${response.status}`);
    }
    return response.json();
}

export async function createMoodEntry(entry) {
    await initializeCsrf();

    const response = await fetch(`${API_URL}/moods/`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken") || "",
        },
        body: JSON.stringify(entry),
    });

    if (!response.ok) {
        throw new Error(`Unable to save mood: ${response.status}`);
    }

    return response.json();
}