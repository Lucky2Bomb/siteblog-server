const { staticPath } = require("../config/config");
const fs = require("fs");

class FileController {
    async uploadImageFile(req, res) {
        try {
            const file = req.files.file;
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                file.mv(`${staticPath}\\${file.name}`);
                return res.json({ message: "файл загружен" });
            }
            res.status(500).json({ message: "Неверный формат загружаемой картинки" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при загрузке файла" });
        }
    }
}

module.exports = new FileController();