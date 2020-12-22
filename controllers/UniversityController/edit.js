const Post = require("../../models/Post");
const { staticPath } = require("../../config/config");
const User = require("../../models/User");
const Uuid = require("uuid");
const University = require("../../models/University");
const Faculty = require("../../models/Faculty");
const Speciality = require("../../models/Speciality");
const SpecialityGroup = require("../../models/SpecialtyGroup");
const UniversityPosition = require("../../models/UniversityPosition");

class editUniversityController {

    async editUniversity(req, res) {
        try {
            const { name, newName, newDescription } = req.body;
            const university = await University.findOne({ name });
            if (!university) {
                return res.status(400).json({ message: "Университетов с таким названием не существует" });
            }
            university.name = newName;
            university.description = newDescription ? newDescription : university.description;

            await university.save();
            return res.json({ message: "Университет изменён" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при изменении университета" });
        }
    }

    async editFaculty(req, res) {
        try {
            const { name, newName, newDescription, universityName } = req.body;
            const university = await University.findOne({ name: universityName });
            const faculty = await Faculty.findOne({ name });
            if (!university) {
                return res.status(400).json({ message: "Университета с таким названием не существует" });
            }
            if (!faculty) {
                return res.status(400).json({ message: "Факультета с таким названием не существует" });
            }
            faculty.name = newName;
            faculty.description = newDescription ? newDescription : faculty.description;
            faculty.university = university.name;
            await faculty.save();
            return res.json({ message: "Факультет изменён" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при изменении факультета" });
        }
    }

    async editSpeciality(req, res) {
        try {
            const { name, newName, newDescription, facultyName } = req.body;
            const faculty = await Faculty.findOne({ name: facultyName });
            const speciality = await Speciality.findOne({ name });
            if (!faculty) {
                return res.status(400).json({ message: "Факультета с таким названием не существует" });
            }
            if (!speciality) {
                return res.status(400).json({ message: "Специальности с таким названием не существует" });
            }

            speciality.name = newName ? newName : speciality.name;
            speciality.description = newDescription ? newDescription : speciality.description;
            speciality.faculty = faculty.name;

            await speciality.save();
            return res.json({ message: "Специальность изменена" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при изменена специальности" });
        }
    }

    async editSpecialityGroup(req, res) {
        try {
            const { name, newName, newDescription, specialityName } = req.body;
            const speciality = await Speciality.findOne({ name: specialityName });
            const specialityGroup = await SpecialityGroup.findOne({ name });

            if (!speciality) {
                return res.status(400).json({ message: "Специальности с таким названием не существует" });
            }
            if (!specialityGroup) {
                return res.status(400).json({ message: "Группы с таким названием не существует" });
            }

            specialityGroup.name = newName ? newName : specialityGroup.name;
            specialityGroup.description = newDescription ? newDescription : specialityGroup.description;
            specialityGroup.speciality = speciality.name;

            await specialityGroup.save();
            return res.json({ message: "Группа по специальности изменена" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при изменении группы" });
        }
    }

    async setUserPosition(req, res) {
        try {
            const { positionName, email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: `Такой пользователь не найден` });
            }
            const position = await UniversityPosition.findOne({ value: positionName });
            if (!position) {
                return res.status(400).json({ message: `Такая должность не найдена` });
            }
            user.position = [position.value];
            await user.save();
            return res.json({ message: `Пользователь ${email} назначен на должность ${positionName}` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при изменении должности пользователя пользователя" });
        }
    }
}

module.exports = new editUniversityController();