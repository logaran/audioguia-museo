const ArtworkInfo = ({ artwok, selectedLanguage }) => {

    return (
        <div className="w-full sm:w-1/2 p-4 z-10" style={{ pointerEvents: 'none' }}>
            <p className="text-sm">{artwok.description}</p>
            <p className="text-md text-gray-700 font-bold">{artwok.author || ''}</p>
            <p className="text-2xl text-gray-700 font-bold italic">{artwok.name[selectedLanguage] || ''}{artwok.date ? `, ${artwok.date}` : ''}</p>
        </div>
    )
}

export default ArtworkInfo;