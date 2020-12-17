const { Router } = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = new Router();

router.post("/create-post", [authMiddleware, roleMiddleware(["ADMIN", "MODER"])], postController.createPost);
router.post("/create-comment-to-post", [authMiddleware], postController.createComment);

router.delete("/delete-comment", [authMiddleware, roleMiddleware(["ADMIN", "MODER"])], postController.deleteComment);
router.delete("/delete-post", [authMiddleware, roleMiddleware(["ADMIN", "MODER"])], postController.deletePost);

router.get("/get-posts", postController.getPosts);
router.get("/get-post", postController.getPost);
router.get("/get-comments-on-post", postController.getCommentsOnPost);

module.exports = router;