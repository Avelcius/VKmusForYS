const axios = require('axios');
const { VK_API_TOKEN } = require('./config');

const searchMusic = async (query) => {
    try {
        const response = await axios.get('https://api.vk.com/method/audio.search', {
            params: {
                q: query,
                access_token: VK_API_TOKEN,
                v: '5.131', // версия API
            },
        });

        const tracks = response.data.response.items;
        if (tracks.length > 0) {
            const track = tracks[0];
            return `Нашел трек: ${track.artist} - ${track.title}. Слушайте: ${track.url}`;
        } else {
            return 'К сожалению, я не нашел ничего по вашему запросу.';
        }
    } catch (error) {
        console.error('Ошибка при поиске музыки:', error);
        return 'Произошла ошибка при поиске музыки.';
    }
};

module.exports = { searchMusic };
