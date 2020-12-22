const User = require("../models/User");
const Role = require("../models/Role");

class roleController {

    async createRole(req, res) {
        try {
            const {value} = req.body;
            const role = await Role.findOne({value});
            if(role) {
                return res.status(400).json({ message: `Такая роль уже есть в списке` });
            }
            const newRole = new Role({value});
            await newRole.save();
            return res.json({ message: `роль ${value} создана` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при создании роли" });
        }
    }

    async getRole(req, res) {
        try {
            const roles = await Role.find();
            return res.json(roles);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении ролей" });
        }
    }

    async deleteRole(req, res) {
        try {
            const {value} = req.query;
            const role = await Role.findOne({value});
            if(!role) {
                return res.status(400).json({ message: `Такая роль не существует` });
            }
            await role.remove();
            return res.json({ message: `роль ${value} удалена` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при удалении роли" });
        }
    }

    async addRoleToUser(req, res) {
        try {
            const { email, roleName } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: `Пользователь не найден` });
            }
            const role = await Role.findOne({ value: roleName });
            if (!role) {
                return res.status(400).json({ message: `Такая роль не найдена` });
            }
            user.roles = [role.value];
            await user.save();
            return res.json({ message: `роль ${role.value} добавлена пользователю ${user.email}` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при добавлении роли" });
        }
    }

    async deleteRoleToUser(req, res) {
        try {
            const { userId, roleName } = req.query;
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(400).json({ message: `Пользователь не найден` });
            }
            const role = await Role.findOne({ value: roleName });
            if (!role) {
                return res.status(400).json({ message: `Такая роль не найдена` });
            }
            // user.role = role.value;
            user.roles = user.roles.filter((r) => r !== role.value);
            await user.save();
            return res.json({ message: `роль ${role.value} удалена у пользователя ${user.email}` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при добавлении роли" });
        }
    }
}

module.exports = new roleController();