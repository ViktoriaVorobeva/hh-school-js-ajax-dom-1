const saveResultInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const getResultFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
        return JSON.parse(value);
    }
    return [];
}

export {
    saveResultInLocalStorage,
    getResultFromLocalStorage
}