export type LanguageCodes = 'es' | 'en' | 'eus' | 'fr' | 'ge' | 'it' | 'nl' | 'da' | 'ru' | 'jp';

export type LocalizedString = { [key in LanguageCodes]?: string; }


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

export interface AppData {
    locals: {
        museumName: LocalizedString;
        appName: LocalizedString | any;
        startButton: LocalizedString;
        backButton: LocalizedString;
        shareText: LocalizedString;
    }
}