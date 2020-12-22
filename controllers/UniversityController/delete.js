const Post = require("../../models/Post");
const { staticPath } = require("../../config/config");
const Uuid = require("uuid");
const University = require("../../models/University");
const User = require("../../models/User");
const Faculty = require("../../models/Faculty");
const Speciality = require("../../models/Speciality");
const SpecialityGroup = require("../../models/SpecialtyGroup");
const UniversityPosition = require("../../models/UniversityPosition");

class deleteUniversityController {

    async deleteUniversity(req, res) {
        try {
            const { name } = req.query;
            const university = await University.findOne({ name });
            if (!university) {
                return res.status(400).json({ message: "Университета с таким названием не существует" });
            }
            await university.remove();
            return res.json({ message: "Университет удалён" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при удалении университета" });
        }
    }

    async deleteFaculty(req, res) {
        try {
            const { name } = req.query;
            const faculty = await Faculty.findOne({ name });
            if (!faculty) {
                return res.status(400).json({ message: "Факультетов с таким названием не существует" });
            }
            await faculty.remove();
            return res.json({ message: "Факультет удалён" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при удалении факультета" });
        }
    }

    async deleteSpeciality(req, res) {
        try {
            const { name } = req.query;
            const speciality = await Speciality.findOne({ name });
            if (!speciality) {
                return res.status(400).json({ message: "Специальностей с таким названием не существует" });
            }
            await speciality.remove();
            return res.json({ message: "Специальность удалёна" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при удалении специальности" });
        }
    }

    async deleteSpecialityGroup(req, res) {
        try {
            const { name } = req.query;
            const specialityGroup = await SpecialityGroup.findOne({ name });
            if (!specialityGroup) {
                return res.status(400).json({ message: "Группы с таким названием не существует" });
            }

            const users = await User.find({ specialityGroup: specialityGroup.name });
            users.map(async (user) => {
                user.specialityGroup = "";
                await user.save();
            });
            await specialityGroup.remove();

            return res.json({ message: "Группа по специальности удалена" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при удалении группы" });
        }
    }

    async deleteUniversityPosition(req, res) {
        try {
            const { positionId } = req.query;
            const up = await UniversityPosition.findOne({ _id: positionId });
            if (!up) {
                return res.status(400).json({ message: "Должности с таким названием не существует" });
            }
            await up.remove();
            return res.json({ message: "Должность удалена" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при удалении должности" });
        }
    }
}

module.exports = new deleteUniversityController();