// Servidor (server.js)
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/artworks', async (req, res) => {
    try {
        const baseMuseumUrl = 'https://www.carmenthyssenmalaga.org/';
        const response = await axios.get(baseMuseumUrl + 'multimedia/audioguias/1/es#');
        const $ = cheerio.load(response.data);
        const artworks = [];
    
        $('ul > li').each((index, element) => {
          const name = $(element).find('.title--classic').text().trim();
          const audioSrc = $(element).find('audio source').attr('src');
          const audioUrl = audioSrc ? new URL(audioSrc, baseMuseumUrl).href : null;
    
          // Limpiar las tabulaciones y espacios en la descripción
          const description = $(element).find('h6').text().replace(/\s+/g, ' ').trim();
    
          const imageStyle = $(element).find('.image').attr('style');
          const imageUrlMatch = imageStyle ? imageStyle.match(/url\((.+?)\)/) : null;
          const imageUrl = imageUrlMatch ? new URL(imageUrlMatch[1], baseMuseumUrl).href : null;
    
          if (name || audioUrl || description || imageUrl) {
            artworks.push({ name, audioUrl, description, imageUrl });
          }
        });
    
        res.json(artworks);
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching the data' });
      }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

