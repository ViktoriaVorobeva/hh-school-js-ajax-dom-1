import { Country } from "./types";

const saveResultInLocalStorage = (key: string, data: unknown[]) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const getResultFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
        return JSON.parse(value) as Country[];
    }
    return [];
}

export {
    saveResultInLocalStorage,
    getResultFromLocalStorage
}