import { LanguageCodes } from "../types";

export type Languages = Record<LanguageCodes, {
  name: string;
  flag: () => string;
}>;

const getFlagUrl = (code: string) => `${process.env.PUBLIC_URL}/flags/${code}.png`;

export const languages: Languages = {
  es: { name: 'Español', flag: () => getFlagUrl('es') },
  en: { name: 'Inglés', flag: () => getFlagUrl('en') },
  eus: { name: 'Euskera', flag: () => getFlagUrl('eus') },
  fr: { name: 'Francés', flag: () => getFlagUrl('fr') },
  ge: { name: 'Alemán', flag: () => getFlagUrl('ge') },
  it: { name: 'Italiano', flag: () => getFlagUrl('it') },
  nl: { name: 'Neerlandés', flag: () => getFlagUrl('nl') },
  da: { name: 'Danés', flag: () => getFlagUrl('da') },
  ru: { name: 'Ruso', flag: () => getFlagUrl('ru') },
  jp: { name: 'Japonés', flag: () => getFlagUrl('jp') }
};
