const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path'); // Importar el módulo path

const fetchArtworks = async () => {
    try {
        const baseMuseumUrl = 'https://www.carmenthyssenmalaga.org/';
        const response = await axios.get(baseMuseumUrl + 'multimedia/audioguias/1/es#');
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

            if (name || audioUrl || description || imageUrl) {
                artworks.push({ name, audioUrl, description, imageUrl });
            }
        });

        // Guardar las obras de arte en un archivo JSON en la carpeta public
        const publicDir = path.join(__dirname, 'public', 'artworks.json'); // Cambia la ruta aquí
        fs.writeFileSync(publicDir, JSON.stringify(artworks, null, 2), 'utf8');
        console.log('Artworks saved to public/artworks.json');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

fetchArtworks();
