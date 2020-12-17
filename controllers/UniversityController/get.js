const Post = require("../../models/Post");
const { staticPath } = require("../../config/config");
const Uuid = require("uuid");
const University = require("../../models/University");
const Faculty = require("../../models/Faculty");
const Speciality = require("../../models/Speciality");
const SpecialityGroup = require("../../models/SpecialtyGroup");

class getUniversityController {

    async getUniversityData(req, res) {
        try {
            const query = req.query;
            // const university = await University.find({ name: query.university });
            let universityData = {};
            if (query.university) {
                const university = await University.findOne({ name: query.university });
                if (!university) {
                    res.status(400).json({ message: `Университет ${query.university} не существует` });
                }
                universityData.university = university;
                if (query.faculty) {

                    const faculty = await Faculty.findOne({ name: query.faculty });
                    if (!faculty) {
                        res.status(400).json({ message: `Факультет ${query.faculty} не существует` });
                    }
                    universityData.faculty = faculty;

                    if (query.speciality) {
                        const speciality = await Speciality.findOne({ name: query.speciality });
                        if (!speciality) {
                            res.status(400).json({ message: `Специальность ${query.speciality} не существует` });
                        }
                        universityData.speciality = speciality;

                        if (query.specialityGroup) {
                            const specialityGroup = await SpecialityGroup.findOne({ name: query.specialityGroup });
                            if (!specialityGroup) {
                                res.status(400).json({ message: `Специальность ${query.specialityGroup} не существует` });
                            }
                            universityData.specialityGroup = specialityGroup;
                        } else {
                            universityData.specialityGroup = await SpecialityGroup.find();
                        }
                    } else {
                        universityData.speciality = await Speciality.find();
                    }
                } else {
                    universityData.faculty = await Faculty.find();
                }
            } else {
                const universities = await University.find();
                return res.json(universities);
            }

            return res.json(universityData);

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при получении списка" });
        }
    }

    async getUniversities(req, res) {
        try {
            const university = await University.find();
            return res.json(university);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при получении списков университетов" });
        }
    }

    async getFaculties(req, res) {
        try {
            const { university } = req.query;
            const faculty = await Faculty.find({ university });
            if (!faculty) {
                res.status(400).json({ message: `Университет ${university} не существует` });
            }

            return res.json(faculty);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при получении факультетов" });
        }
    }

    async getSpecialities(req, res) {
        try {
            const { faculty } = req.query;
            const speciality = await Speciality.find({ faculty });
            if (!speciality) {
                res.status(400).json({ message: `Факультет ${faculty} не существует` });
            }

            return res.json(speciality);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при получении специальностей" });
        }
    }

    async getSpecialityGroups(req, res) {
        try {
            const { speciality } = req.query;
            const specialityGroup = await SpecialityGroup.find({ speciality });
            if (!specialityGroup) {
                res.status(400).json({ message: `Специальность ${speciality} не существует` });
            }
            return res.json(specialityGroup);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка при получении групп" });
        }
    }
}

module.exports = new getUniversityController();