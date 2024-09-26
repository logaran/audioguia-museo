export const AnalyticsEvents = {
    AUDIO_PLAY: (audioName) => ({
        eventName: 'audio_play',
        params: {
            audio_name: audioName,
            timestamp: new Date().toISOString()
        }
    }),
    FAVORITE_MARK: (itemName) => ({
        eventName: 'favorite_mark',
        params: {
            item_name: itemName,
            timestamp: new Date().toISOString()
        }
    }),
    
};
