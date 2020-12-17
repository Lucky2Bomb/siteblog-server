const User = require("../models/User");
const Post = require("../models/Post");
const { staticPath } = require("../config/config");
const Uuid = require("uuid");
const Comment = require("../models/Comment");

class postController {

    async getPosts(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            // const offset = req.query.offset;
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(limit <= 50 ? limit : 50, 10),
                // offset: parseInt(offset, 10),
                sort: { dateCreated: -1 }
            }

            // console.log(`page = ${page} limit = ${limit}`);
            const posts = await Post.paginate({}, options);
            return res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении постов" });
        }
    }

    async getPost(req, res) {
        try {
            const _id = req.query.id;
            const post = await Post.find({ _id });

            return res.json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении постов" });
        }
    }

    async getCommentsOnPost(req, res) {
        try {
            const postId = req.query.postId;
            const comments = await Comment.find({post: postId});
            if(!comments) {
                res.status(400).json({ message: "Комментарии к посту не найдены" });
            }

            return res.json(comments);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении комментариев" });
        }
    }

    async createComment(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id });
            const post = await Post.findOne({ _id: req.body.postId });
            if (!user) {
                res.status(400).json({ message: "Пользователь не найден" });
            }
            if(!post) {
                res.status(400).json({ message: "Пост не найден" });
            }
            const text = req.body.text;
            const comment = new Comment({ author: user.email, text, user: req.user.id, post: post._id })
            await comment.save();
            res.json({ message: "комментарий опубликован" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при публикации комментарияя" });
        }
    }

    async deleteComment(req, res) {
        try {
            const comment = await Comment.findOne({_id: req.query.id});
            if(!comment) {
                res.status(400).json({ message: "Комментарий не найден" });
            }
            await comment.delete();
            res.json({message: "комментарий удалён"});
        } catch {
            console.log(error);
            res.status(500).json({ message: "Ошибка при удалении комментария" });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Post.findOne({_id: req.query.id});
            if(!post) {
                res.status(400).json({ message: "Пост не найден" });
            }
            await post.delete();
            res.json({message: "пост удалён"});
        } catch {
            console.log(error);
            res.status(500).json({ message: "Ошибка при удалении поста" });
        }
    }

    async createPost(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id });
            if (!user) {
                res.status(400).json({ message: "Пользователь не найден" });
            }
            const { title, text } = req.body;

            if (req.files && req.files.file) {
                const file = req.files.file;
                if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                    const fileName = `${Uuid.v4()}.${file.mimetype.split('/')[1]}`;
                    const post = new Post({ title, text, user: user.email, fileName });

                    file.mv(`${staticPath}\\${fileName}`);

                    //for glitch.com
                    //file.mv(`static/${fileName}`);

                    await post.save();
                    return res.json({ message: "Пост опубликован" });
                } else {
                    res.status(500).json({ message: "Неверный формат загружаемой картинки" });
                }
            }
            const post = new Post({ title, text, user: user.email });
            await post.save();
            return res.json({ message: "Пост опубликован" });


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при загрузке файла" });
        }
    }
}

module.exports = new postController();