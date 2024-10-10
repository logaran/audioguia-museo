export interface Languages {
  code: string;
  name: string;
  flag: () => string;
}

const getFlagUrl = (code: string) => `${process.env.PUBLIC_URL}/flags/${code}.png`;

export const languages: Languages[] = [
  { code: 'es', name: 'Español', flag: () => getFlagUrl('es') },
  { code: 'en', name: 'Inglés', flag: () => getFlagUrl('en') },
  { code: 'eus', name: 'Euskera', flag: () => getFlagUrl('eus') },
  { code: 'fr', name: 'Francés', flag: () => getFlagUrl('fr') },
  { code: 'ge', name: 'Alemán', flag: () => getFlagUrl('ge') },
  { code: 'it', name: 'Italiano', flag: () => getFlagUrl('it') },
  { code: 'nl', name: 'Neerlandés', flag: () => getFlagUrl('nl') },
  { code: 'da', name: 'Danés', flag: () => getFlagUrl('da') },
  { code: 'ru', name: 'Ruso', flag: () => getFlagUrl('ru') },
  { code: 'jp', name: 'Japonés', flag: () => getFlagUrl('jp') },
  // Agrega más idiomas si es necesario
];
