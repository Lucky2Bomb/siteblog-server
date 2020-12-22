const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secretKey } = require("../config/config");
const UniversityPosition = require("../models/UniversityPosition");
const SpecialtyGroup = require("../models/SpecialtyGroup");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: `${errors.array()[0].msg}` });
            }
            const {
                email,
                password,
                firstname,
                lastname,
                patronymic,
                dateOfBirth,
                avatarUrl,
                specialityGroupId
            } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: "Такой пользователь уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({ value: "USER" });
            const userPosition = await UniversityPosition.findOne({ value: "студент" });

            const user = new User({ email, password: hashPassword, roles: [userRole.value], position: [userPosition.value] });

            const specGroup = specialityGroupId && await SpecialtyGroup.findOne({ _id: specialityGroupId });
            if (specialityGroupId && !specGroup) {
                return res.status(400).json({ message: `Группа по специальности не найдена` });
            }

            user.firstname = firstname ? firstname : "";
            user.lastname = lastname ? lastname : "";
            user.patronymic = patronymic ? patronymic : "";
            user.dateOfBirth = dateOfBirth ? dateOfBirth : "";
            user.avatarUrl = avatarUrl ? avatarUrl : "";
            if (specialityGroupId) {
                user.specialityGroup = specGroup.name;
            }
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
                user
            });
        } catch (error) {
            console.log(error);
            res.send({ message: "Ошибка аунтефикации" });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id });
            if (!user) {
                return res.status(400).json({ message: `Пользователь не найден` });
            }
            user.password = "";
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка получения пользователя" });
        }
    }

    async getSomeProfile(req, res) {
        try {
            const user = await User.findOne({ email: req.query.email });
            if (!user) {
                return res.status(400).json({ message: `Пользователь не найден` });
            }
            user.password = "";
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка получения пользователя" });
        }
    }

    async editProfile(req, res) {
        try {
            const {
                firstname,
                lastname,
                patronymic,
                dateOfBirth,
                avatarUrl,
                specialityGroup
            } = req.body;


            const specGroup = specialityGroup && await SpecialtyGroup.findOne({ name: specialityGroup });
            if (specialityGroup && !specGroup) {
                return res.status(400).json({ message: `Группа по специальности не найдена` });
            }

            const user = await User.findOne({ _id: req.user.id });
            if (!user) {
                return res.status(400).json({ message: `Пользователь не найден` });
            }
            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;
            if (patronymic) user.patronymic = patronymic;
            if (dateOfBirth) user.dateOfBirth = dateOfBirth;
            if (avatarUrl) user.avatarUrl = avatarUrl;
            if (specialityGroup) user.specialityGroup = specGroup.name;
            await user.save();

            return res.json({ message: "данные профиля изменены" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при изменении данных" });
        }
    }
}

module.exports = new authController();