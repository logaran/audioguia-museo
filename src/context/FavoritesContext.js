import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useAnalytics } from './AnaliticsContext';
import { useArtworks } from './ArtworksContext';
import { useLanguage } from './LanguageContext';

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {

    const { currentArtwork, artworks } = useArtworks();
    const [cookies, setCookie] = useCookies(['likes']);
    const { trackEvent, analyticsEvents } = useAnalytics();
    const { selectedLanguage } = useLanguage();
    const [favorites, setFavorites] = useState([]);

    const toggleLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const currentLikes = cookies.likes ? [...cookies.likes] : [];
        let updatedLikes;
        if (currentLikes.includes(currentArtwork.id)) {
            updatedLikes = currentLikes.filter(id => id !== currentArtwork.id);
        } else {
            updatedLikes = [...currentLikes, currentArtwork.id];
            trackEvent(analyticsEvents.FAVORITE_MARK(currentArtwork.name[selectedLanguage]));
        }
        setCookie('likes', updatedLikes, { path: '/' });
    };

    useEffect(() => {
        if (cookies.likes) {
            const artworksArray = Object.values(artworks);
            const favorites = artworksArray.filter(artwork => cookies.likes.includes(artwork.id));
            setFavorites(favorites);
        }
    }, [cookies.likes, artworks])

    return (
        <FavoritesContext.Provider value={{ favorites, cookies, toggleLike }}>
            {children}
        </FavoritesContext.Provider>
    )
}