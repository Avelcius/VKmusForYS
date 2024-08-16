const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const router = express.Router();

// Ваши данные от приложения ВКонтакте
const { CLIENT_ID } = require('./config');
const { CLIENT_SECRET } = require('./config');
const { REDIRECT_URI } = require('./config');

// Страница авторизации ВКонтакте
router.get('/auth', (req, res) => {
    const authUrl = `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=popup&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=offline`;
    res.redirect(authUrl);
});

// Обработка редиректа после авторизации
router.get('/auth/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        // Получение access_token
        const response = await axios.post('https://oauth.vk.com/access_token', querystring.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            code: code
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, user_id, expires_in } = response.data;

        // Отображение информации о полученном токене
        res.json({
            access_token,
            user_id,
            expires_in
        });
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).send('Error during authorization');
    }
});

module.exports = router;
