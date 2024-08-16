const express = require('express');
const bodyParser = require('body-parser');
const vkAuth = require('./vkAuth');
const { handleRequest } = require('./handlers');

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.json());

// Обработка запросов от Алисы
app.post('/webhook', async (req, res) => {
    await handleRequest(req, res);
});

// Используйте маршруты из vkAuth.js для аутентификации ВКонтакте
app.use('/vk', vkAuth);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
