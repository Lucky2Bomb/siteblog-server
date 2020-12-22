const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secretKey } = require("../config/config");
const UniversityPosition = require("../models/UniversityPosition");
const SpecialtyGroup = require("../models/SpecialtyGroup");

class usersController {
    async getUsers(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(limit <= 50 ? limit : 50, 10),
                sort: { dateCreated: -1 }
            }

            const users = await User.paginate({}, options);
            return res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении пользователей" });
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.query;
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(400).json({ message: `Такой пользователь не найден` });
            }
            await user.remove();
            return res.json({ message: "Пользователь удалён" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при удалении пользователя" });
        }
    }
}

module.exports = new usersController();