const ArtworkInfo = ({ artwok, selectedLanguage, isPlaying }) => {

    return (

        <div className="w-full sm:w-1/2 p-4 z-50 truncate" style={{ pointerEvents: 'none' }}>
            <p className="text-sm">{artwok.description}</p>
            <p className="text-md text-gray-900 font-bold">{artwok.author || ''}</p>
            <p className="text-gray-900 font-bold"
                style={{fontSize: "clamp(0.5rem, 5.5vw, 1.5rem)"}}>
                <span className="italic">{artwok.name[selectedLanguage] || ''}</span>
                {artwok.date ? `, ${artwok.date}` : ''}
            </p>

        </div>
    )
}

export default ArtworkInfo;