const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");

const { port, dbUrl } = require("./config/config");

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes");

const corsMiddleware = require("./middleware/cors.middleware");
const filePathMiddleware = require("./middleware/filePath.middleware");

const PORT = process.env.PORT || port;
const app = express();

app.use(fileUpload({}));
app.use(express.static("static"));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, "static")));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

async function testConnectToDB() {
    try {
        await mongoose.connect(dbUrl);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database.');
    }
}

const start = async () => {
    try {
        await testConnectToDB();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server is not starting...");
        console.log(error);
    }
}

start();