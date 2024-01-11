import { Country } from "./types"

export const request = (value: string): Promise<Country[]> => {
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
            return response.json() as Promise<Country[]>
        }, (reason) => {
            return Promise.reject(reason)
        })
}