const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secretKey } = require("../config/config");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: `${errors.array()[0].msg}` });
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: "Такой пользователь уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({ value: "USER" });

            const user = new User({ email, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({ message: "Пользователь зарегистрирован" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка регистрации" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: `Пользователь ${user.email} не найден` });
            }
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: `Пароль введён неверно` });
            }
            const token = jwt.sign({ id: user._id, roles: user.roles }, secretKey, { expiresIn: "12h" });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    roles: [...user.roles]
                }
            });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка входа" });
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id });
            if (!user) {
                return res.status(400).json({ message: `Ошибка авторизации` });
            }

            const token = jwt.sign({ id: user._id, roles: user.roles }, secretKey, { expiresIn: "12h" });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    roles: [...user.roles]
                }
            });
        } catch (error) {
            console.log(error);
            res.send({ message: "Ошибка аунтефикации" });
        }
    }

    async getProfile(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController();