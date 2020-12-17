const { Router } = require("express");
const router = new Router();
const controller = require("../controllers/roleController");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// /api/role

router.post("/create-role", [authMiddleware, roleMiddleware(["ADMIN"])], controller.createRole);
router.get("/get-role", [authMiddleware, roleMiddleware(["ADMIN"])], controller.getRole);
router.delete("/delete-role", [authMiddleware, roleMiddleware(["ADMIN"])], controller.deleteRole);

router.post("/add-role-to-user", [authMiddleware, roleMiddleware(["ADMIN"])], controller.addRoleToUser);
router.delete("/delete-role-to-user", [authMiddleware, roleMiddleware(["ADMIN"])], controller.deleteRoleToUser);

module.exports = router;