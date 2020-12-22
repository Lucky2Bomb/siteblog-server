const { Router } = require("express");
// const User = require("../models/User");
const router = new Router();
const controller = require("../controllers/authController");
const {check} = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// /api/auth

router.post("/registration", [
    // check("email", "Email введён некорректно").isEmail(),
    check("password", "Пароль должен быть не короче 6 символов и не длиннее 20").isLength({min: 6, max: 20})
], controller.registration);
router.post("/login", controller.login);
router.post("/edit-profile", authMiddleware, controller.editProfile);

router.get("/auth", authMiddleware, controller.auth);
router.get("/profile", authMiddleware, controller.getProfile);
router.get("/someProfile", authMiddleware, controller.getSomeProfile);

module.exports = router;