type LanguageCodes = 'es' | 'es' | 'it' | 'du';

type LocalizedString = { [key in LanguageCodes]: string | null; }


export interface ExpositionInfo {
    name: LocalizedString,
    description: LocalizedString,
    date: LocalizedString,
    imageUrl: string
}

export interface Artwork {
    name: LocalizedString,
    author: string,
    date: string,
    description: string,
    id: string
}