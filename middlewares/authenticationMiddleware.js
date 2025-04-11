const keyModel = require('../models/keyModel');

module.exports = (req, res, next) => {
    const key = req.headers['authorization'];

    if (!key)
        return res.status(404).json({error: "Header authorization not found"})
    const apikey = keyModel.findKey(key.replace('ApiKey ', ''));

    if (apikey && apikey.enabled)
        return next();
    else
        res.sendStatus(401);
}