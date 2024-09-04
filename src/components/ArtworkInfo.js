const ArtworkInfo = ({ artwok, selectedLanguage }) => {

    return (
        <div style={{ pointerEvents: 'none' }}>
            <p className="text-md text-gray-700 font-bold">{artwok.author || ''}</p>
            <p className="text-2xl text-gray-700 font-bold italic">{artwok.name[selectedLanguage] || ''}{artwok.date ? `, ${artwok.date}` : ''}</p>
            <p className="text-sm">{artwok.description}</p>
        </div>
    )
}

export default ArtworkInfo;