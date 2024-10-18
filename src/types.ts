export type LanguageCodes =
  | "es"
  | "en"
  | "eus"
  | "fr"
  | "ge"
  | "it"
  | "nl"
  | "da"
  | "ru"
  | "jp";

export type LocalizedString = { [key in LanguageCodes]?: string };

export interface ExpositionData {
  name: LocalizedString;
  description: LocalizedString;
  date: LocalizedString;
  imageUrl: string;
  copy: LocalizedString;
}

export interface Artwork {
  name: LocalizedString;
  author: string;
  date: string;
  description: string;
  id: string;
}

export interface ArtworksContextValue {
  artworks: Artwork[];
  currentArtwork: Artwork | undefined;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  expositionData: ExpositionData | null;
  loading: boolean;
  error: string | null;
}
export interface AnalyticsEvent {
  eventName: string;
  category: string;
  action: string;
  label: string;
  [key: string]: string | null;
}

export type AnalyticsEventFunction = (itemName: string) => AnalyticsEvent;

export interface AnalitycsContextValue {
  trackPageView: (path: string) => void;
  trackEvent: (event: AnalyticsEvent) => void;
  analyticsEvents: { [key: string]: AnalyticsEventFunction };
}

export interface AppData {
  locals: {
    museumName: LocalizedString;
    appName: LocalizedString | any;
    startButton: LocalizedString;
    backButton: LocalizedString;
    shareText: LocalizedString;
  };
}
export type MyCookies = {
  likes?: string[];
};
export interface FavoritesContextValue {
  favorites: Artwork[];
  cookies: MyCookies;
  toggleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LanguageContextValue {
  selectedLanguage: LanguageCodes;
  setSelectedLanguage: (key: LanguageCodes) => void;
}

export type Direction = "right" | "left";

export interface GesturesContextValue {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleSwipe: (direction: Direction) => void;
  swipeOffset: number;
}

export interface PlayBackContextValue {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
}

export interface AudioGuideAppProps {
  isMobile: boolean;
  isDarkMode: boolean;
}

export interface AudioPlayerProps {
  isMobile: boolean;
  mediaRef: React.LegacyRef<HTMLAudioElement> | undefined;
  activeResourceUrl: string;
}