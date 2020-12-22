const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const getUniversityController = require("../controllers/UniversityController/get");
const createUniversityController = require("../controllers/UniversityController/create");
const deleteUniversityController = require("../controllers/UniversityController/delete");
const editUniversityController = require("../controllers/UniversityController/edit");
const router = new Router();

// /api/university

router.post("/create-university", [authMiddleware, roleMiddleware(["ADMIN"])], createUniversityController.createUniversity);
router.post("/create-faculty", [authMiddleware, roleMiddleware(["ADMIN"])], createUniversityController.createFaculty);
router.post("/create-speciality", [authMiddleware, roleMiddleware(["ADMIN"])], createUniversityController.createSpeciality);
router.post("/create-speciality-group", [authMiddleware, roleMiddleware(["ADMIN"])], createUniversityController.createSpecialityGroup);

router.delete("/delete-university", [authMiddleware, roleMiddleware(["ADMIN"])], deleteUniversityController.deleteUniversity);
router.delete("/delete-faculty", [authMiddleware, roleMiddleware(["ADMIN"])], deleteUniversityController.deleteFaculty);
router.delete("/delete-speciality", [authMiddleware, roleMiddleware(["ADMIN"])], deleteUniversityController.deleteSpeciality);
router.delete("/delete-speciality-group", [authMiddleware, roleMiddleware(["ADMIN"])], deleteUniversityController.deleteSpecialityGroup);

router.post("/edit-university", [authMiddleware, roleMiddleware(["ADMIN"])], editUniversityController.editUniversity);
router.post("/edit-faculty", [authMiddleware, roleMiddleware(["ADMIN"])], editUniversityController.editFaculty);
router.post("/edit-speciality", [authMiddleware, roleMiddleware(["ADMIN"])], editUniversityController.editSpeciality);
router.post("/edit-speciality-group", [authMiddleware, roleMiddleware(["ADMIN"])], editUniversityController.editSpecialityGroup);

router.get("/get-universities", getUniversityController.getUniversities);
router.get("/get-faculties", getUniversityController.getFaculties);
router.get("/get-specialities", getUniversityController.getSpecialities);
router.get("/get-speciality-groups", getUniversityController.getSpecialityGroups);
router.get("/get-all-faculties", getUniversityController.getAllFaculties);
router.get("/get-all-specialities", getUniversityController.getAllSpecialities);
router.get("/get-all-speciality-groups", getUniversityController.getAllSpecialityGroups);
router.get("/get-all-way-speciality-group", getUniversityController.getAllWaySpecialityGroup);
router.get("/group", getUniversityController.getUsersInSpecialityGroup);

router.get("/get-university-data", getUniversityController.getUniversityData);

router.get("/get-university-positions", createUniversityController.getUniversityPositions);
router.post("/create-university-position", [authMiddleware, roleMiddleware(["ADMIN"])], createUniversityController.createUniversityPosition);
router.post("/set-user-university-position", [authMiddleware, roleMiddleware(["ADMIN"])], editUniversityController.setUserPosition);
router.delete("/delete-university-position", [authMiddleware, roleMiddleware(["ADMIN"])], deleteUniversityController.deleteUniversityPosition);
module.exports = router;