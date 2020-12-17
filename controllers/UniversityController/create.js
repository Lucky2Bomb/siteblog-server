const Post = require("../../models/Post");
const { staticPath } = require("../../config/config");
const Uuid = require("uuid");
const University = require("../../models/University");
const Faculty = require("../../models/Faculty");
const Speciality = require("../../models/Speciality");
const SpecialityGroup = require("../../models/SpecialtyGroup");
const UniversityPosition = require("../../models/UniversityPosition");

class createUniversityController {

    async createUniversity(req, res) {
        try {
            const { name, description } = req.body;
            const candidateName = await University.findOne({ name });
            if (candidateName) {
                return res.status(400).json({ message: "Университет с таким названием уже существует" });
            }

            const university = new University({ name, description });
            await university.save();
            return res.json({ message: "Университет создан" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при создании университета" });
        }
    }

    async createFaculty(req, res) {
        try {
            const { name, description, universityName } = req.body;
            const university = await University.findOne({ name: universityName });
            if (!university) {
                return res.status(400).json({ message: "Университетов с таким названием не существует" });
            }
            // else if(facultyCreated && (facultyCreated.university === universityName)) {
            //     return res.status(400).json({ message: `В университете "${universityName}" уже есть факультет c названием "${name}"` });
            // }

            const faculty = new Faculty({ name, description, university: university.name });
            await faculty.save();
            return res.json({ message: "Факультет создан" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при создании факультета" });
        }
    }

    async createSpeciality(req, res) {
        try {
            const { name, description, facultyName } = req.body;
            const faculty = await Faculty.findOne({ name: facultyName });
            if (!faculty) {
                return res.status(400).json({ message: "Факультетов с таким названием не существует" });
            }

            const speciality = new Speciality({ name, description, faculty: faculty.name });
            await speciality.save();
            return res.json({ message: "Специальность создана" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при создании специальности" });
        }
    }

    async createSpecialityGroup(req, res) {
        try {
            const { name, description, specialityName } = req.body;
            const speciality = await Speciality.findOne({ name: specialityName });
            if (!speciality) {
                return res.status(400).json({ message: "Специальностей с таким названием не существует" });
            }
            const specialityGroup = new SpecialityGroup({ name, description, speciality: speciality.name });
            await specialityGroup.save();
            return res.json({ message: "Группа по специальности создана" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при создании группы" });
        }
    }

    async createUniversityPosition(req, res) {
        try {
            const { value, universityId } = req.body;
            const university = await University.findOne({ _id: universityId });
            if (!university) {
                return res.status(400).json({ message: "Университетов с таким названием не существует" });
            }
            const position = await UniversityPosition.findOne({ value });
            if (position && (position.university === universityId) && (position.value === value)) {
                return res.status(400).json({ message: "В этом университете уже есть такая должность" });
            }

            const newPosition = new UniversityPosition({value, university: universityId});
            await newPosition.save();
            return res.json({ message: "Должность создана" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при создании должности" });
        }
    }
}

module.exports = new createUniversityController();