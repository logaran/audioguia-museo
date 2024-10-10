export interface LocalizedString

export interface ExpositionInfo {
    name: {
        es: string,
        en: string,
    },
    description: {
        es: string,
        en: string
    },
    date: {
        es: string,
        en: string
    },
    imageUrl: string
}

export interface Artwork {
    name: {
        es: string,
        en: string
    },
    author: string,
    date: string,
    description: string,
    id: string
}