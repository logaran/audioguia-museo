import ArtworkThumbnail from './ArtworkThumbnail';

const ArtworksList = ({ artworks, setIndex, showList, selectedLanguage }) => {

    return (
        <div>
            <div className="space-y-1 overflow-auto absolute inset-2 rounded bg-white z-50">
                {artworks.map((item, index) => (
                    <ArtworkThumbnail
                        key={item.description}
                        artwork={item}
                        selectedLanguage={selectedLanguage}
                        setIndex={setIndex}
                        showList={showList}
                        selectedIndex={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArtworksList;
