import ArtworkThumbnail from './ArtworkThumbnail';

const ArtworksList = ({ artworks, setIndex, showList, selectedLanguage }) => {

    return (
        <div>
            <div className="flex w-full flex-wrap gap-2 overflow-auto absolute inset-0 p-2 bg-white dark:bg-gray-800 z-50">
                {artworks.map((item, index) => (
                    <ArtworkThumbnail
                        key={item.id}
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
