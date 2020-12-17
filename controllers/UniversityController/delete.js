const Post = require("../../models/Post");
const { staticPath } = require("../../config/config");
const Uuid = require("uuid");
const University = require("../../models/University");
const Faculty = require("../../models/Faculty");
const Speciality = require("../../models/Speciality");
const SpecialityGroup = require("../../models/SpecialtyGroup");

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
            const specialityGroup = await Speciality.findOne({ name });
            if (!specialityGroup) {
                return res.status(400).json({ message: "Групп с таким названием не существует" });
            }
            await specialityGroup.remove();
            return res.json({ message: "Группа по специальности удалена" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при удалении группы" });
        }
    }
}

module.exports = new deleteUniversityController();