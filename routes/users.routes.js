const { Router } = require("express");
// const User = require("../models/User");
const router = new Router();
const {check} = require("express-validator");
const controller = require("../controllers/usersController");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// /api/users

router.get("/get-users", [authMiddleware, roleMiddleware(["ADMIN", "MODER"])], controller.getUsers);
router.delete("/delete-user", [authMiddleware, roleMiddleware(["ADMIN"])], controller.deleteUser);

module.exports = router;