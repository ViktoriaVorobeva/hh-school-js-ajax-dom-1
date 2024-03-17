import { Country } from "./types";

const saveResultInLocalStorage = (key: string, data: unknown[]) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        localStorage.clear()
    }
}

const getResultFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
        try {
            return JSON.parse(value) as Country[];
        } catch {
            return []
        }
    }
    return [];
}

export {
    saveResultInLocalStorage,
    getResultFromLocalStorage
}