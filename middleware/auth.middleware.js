const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }
}