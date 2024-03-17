export interface Country {
    name: {
        common: string
    },
    capital: string[],
    flags: {
        png: string
        alt: string
    }
    currencies: {
        string: {
            name: string,
            symbol: string
        }
    }
    languages: {
        string: string
    }
}