const { Router } = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = new Router();

router.post("/create-post", [authMiddleware, roleMiddleware(["ADMIN"])], postController.createPost);
router.get("/get-posts", postController.getPosts);

module.exports = router;