export const request = (value) => {
    return fetch(`https://restcountries.com/v3.1/name/${value}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
        })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject('error')
            }
            return response.json()
        }, (reason) => {
            return Promise.reject(reason)
        })
}