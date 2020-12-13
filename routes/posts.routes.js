const { Router } = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = new Router();
// const controller = require("../controllers/authController");
// const authMiddleware = require("../middleware/auth.middleware");
// const roleMiddleware = require("../middleware/role.middleware");


// router.post("/registration", controller.registration);
// router.post("/login", controller.login);
// router.get("/auth", authMiddleware, controller.auth);
// router.get("/profile", roleMiddleware(["ADMIN"]), controller.getProfile);

// router.post("/test", postController.testCreatePost);
router.post("/create-post", [authMiddleware, roleMiddleware(["ADMIN"])], postController.createPost);
router.get("/get-posts", postController.getPosts);

module.exports = router;