const handleRequest = (req, res) => {
    const { meta, session } = req.body;

    if (meta.interfaces && meta.interfaces.account_linking) {
        // Если устройство поддерживает авторизацию
        res.json({
            "start_account_linking": {},
            "version": "1.0"
        });
    } else {
        // Если устройство не поддерживает авторизацию
        res.json({
            "response": {
                "text": "Извините, эта поверхность не поддерживает авторизацию.",
                "end_session": false
            },
            "version": "1.0"
        });
    }
};

    

module.exports = { handleRequest };
