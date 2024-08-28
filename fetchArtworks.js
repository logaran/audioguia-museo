const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path'); // Importar el módulo path

const baseMuseumUrl = 'https://www.carmenthyssenmalaga.org/';

// Función para obtener los códigos de idioma disponibles
const fetchLanguages = async () => {
    const url = `${baseMuseumUrl}multimedia/audioguias/1/es`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const languages = [];

    $('select[name="idioma"] option').each((index, element) => {
        const value = $(element).val();
        if (value) {
            languages.push(value);
        }
    });

    return languages;
};

// Función para obtener las audioguías para un idioma específico
const fetchArtworksByLanguage = async (languageCode) => {
    const url = `${baseMuseumUrl}multimedia/audioguias/1/${languageCode}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const artworks = [];

    $('ul > li').each((index, element) => {
        const name = $(element).find('.title--classic').text().trim();
        const audioSrc = $(element).find('audio source').attr('src');
        const audioUrl = audioSrc ? new URL(audioSrc, baseMuseumUrl).href : null;
        const description = $(element).find('h6').text().replace(/\s+/g, ' ').trim();
        const imageStyle = $(element).find('.image').attr('style');
        const imageUrlMatch = imageStyle ? imageStyle.match(/url\((.+?)\)/) : null;
        const imageUrl = imageUrlMatch ? new URL(imageUrlMatch[1], baseMuseumUrl).href : null;

        if (name && audioUrl) {
            artworks.push({
                name: {
                    [languageCode]: name
                },
                audioUrl: {
                    [languageCode]: audioUrl
                },
                description,
                imageUrl
            });
        }
    });

    return artworks;
};

// Función para obtener las audiodescripciones
const fetchAudiodescriptions = async () => {
    const url = `${baseMuseumUrl}multimedia/audiodescripciones`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const audiodescriptions = [];

    $('ul > li').each((index, element) => {
        const name = $(element).find('.title--classic').text().trim();
        const audioDescSrc = $(element).find('audio source').attr('src');
        const audiodescriptionUrl = audioDescSrc ? new URL(audioDescSrc, baseMuseumUrl).href : null;

        if (name && audiodescriptionUrl) {
            audiodescriptions.push({
                name,
                audiodescriptionUrl
            });
        }
    });

    return audiodescriptions;
};

// Función para obtener los videos en lengua de signos
const fetchSignLanguageVideos = async () => {
    const url = `${baseMuseumUrl}multimedia/lengua-signos`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const signLanguageVideos = [];

    $('ul > li').each((index, element) => {
        const name = $(element).find('.title--classic').text().trim();
        const videoHref = $(element).find('a').attr('href');
        const signLanguageUrl = videoHref ? new URL(videoHref, baseMuseumUrl).href : null;

        if (name && signLanguageUrl) {
            signLanguageVideos.push({
                name,
                signLanguageUrl
            });
        }
    });

    return signLanguageVideos;
};

// Función principal para obtener todos los datos y guardarlos en un archivo JSON
const fetchAllData = async () => {
    try {
        const languages = await fetchLanguages();
        const artworks = [];

        for (const languageCode of languages) {
            const artworksByLanguage = await fetchArtworksByLanguage(languageCode);
            artworksByLanguage.forEach(artwork => {
                let existingArtwork = artworks.find(art => art.description === artwork.description);
                if (!existingArtwork) {
                    existingArtwork = {
                        name: {},
                        audioUrl: {},
                        description: artwork.description,
                        imageUrl: artwork.imageUrl
                    };
                    artworks.push(existingArtwork);
                }
                existingArtwork.audioUrl[languageCode] = artwork.audioUrl[languageCode];
                existingArtwork.name[languageCode] = artwork.name[languageCode];
            });
        }

        const audiodescriptions = await fetchAudiodescriptions();
        audiodescriptions.forEach(({ name, audiodescriptionUrl }) => {
            let existingArtwork = artworks.find(art => art.name.es === name);
            if (existingArtwork && audiodescriptionUrl) {
                existingArtwork.audiodescriptionUrl = audiodescriptionUrl;
            } else if (audiodescriptionUrl) {
                artworks.push({
                    name,
                    audioUrl: {},
                    description: '',
                    imageUrl: null,
                    audiodescriptionUrl,
                    signLanguageUrl: null
                });
            }
        });

        const signLanguageVideos = await fetchSignLanguageVideos();
        signLanguageVideos.forEach(({ name, signLanguageUrl }) => {
            let existingArtwork = artworks.find(art => art.name.es === name);
            if (existingArtwork && signLanguageUrl) {
                existingArtwork.signLanguageUrl = signLanguageUrl;
            } else if (signLanguageUrl) {
                artworks.push({
                    name,
                    audioUrl: {},
                    description: '',
                    imageUrl: null,
                    audiodescriptionUrl: null,
                    signLanguageUrl
                });
            }
        });

        // Guardar las obras de arte en un archivo JSON en la carpeta public
        const publicDir = path.join(__dirname, 'public', 'artworks.json'); // Cambia la ruta aquí
        fs.writeFileSync(publicDir, JSON.stringify(artworks, null, 2), 'utf8');
        console.log('Artworks saved to public/artworks.json');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

fetchAllData();
