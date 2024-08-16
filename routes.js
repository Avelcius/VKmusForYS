const express = require('express');
const router = express.Router();
const { searchMusic } = require('./vkApi');

router.post('/', async (req, res) => {
    const { request, session, version } = req.body;
    const { command } = request;

    let responseText = 'Я вас не понимаю.';

    // Пример обработки команды для поиска музыки
    if (command.includes('поиск')) {
        const searchQuery = command.replace('поиск', '').trim();
        if (searchQuery) {
            responseText = await searchMusic(searchQuery);
        }
    }

    res.json({
        version,
        session,
        response: {
            text: responseText,
            end_session: false,
        },
    });
});

module.exports = router;
