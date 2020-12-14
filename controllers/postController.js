const User = require("../models/User");
const Post = require("../models/Post");
const { staticPath } = require("../config/config");
const Uuid = require("uuid");

class postController {

    async getPosts(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(limit <= 10 ? limit : 10, 10),
            }

            // console.log(`page = ${page} limit = ${limit}`);
            const posts = await Post.paginate({}, options);
            return res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении постов" });
        }
    }

    async createPost(req, res) {
        try {
            const file = req.files.file;
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                const user = await User.findOne({ _id: req.user.id });
                if (!user) {
                    res.status(400).json({ message: "Пользователь не найден" });
                }
                const { title, text } = req.body;
                const fileName = `${Uuid.v4()}.${file.mimetype.split('/')[1]}`;

                const post = new Post({ title, text, user: user.email, fileName});

                file.mv(`${staticPath}\\${fileName}`);
                await post.save();
                return res.json({ message: "Пост опубликован" });
            }
            res.status(500).json({ message: "Неверный формат загружаемой картинки" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при загрузке файла" });
        }
    }
}

module.exports = new postController();