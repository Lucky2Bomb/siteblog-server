const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");

const { port, dbUrl } = require("./config/config");

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes");
const universityRouter = require("./routes/university.routes");
const roleRouter = require("./routes/role.routes");

const corsMiddleware = require("./middleware/cors.middleware");
const filePathMiddleware = require("./middleware/filePath.middleware");
const fs = require("fs");
const config = require("./config/config");

const PORT = process.env.PORT || port;
const app = express();

app.use(fileUpload({}));
app.use(express.static("static"));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, "static")));


app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/university", universityRouter);
app.use("/api/role", roleRouter);

async function testConnectToDB() {
    try {
        await mongoose.connect(dbUrl);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database.');
    }
}

function checkStaticFolder() {
    try {
        fs.statSync(path.resolve(__dirname, "static"));
    } catch (error) {
        fs.mkdirSync(path.resolve(__dirname, "static"));
        console.log("folder static is created");
    }
}

const start = async () => {
    try {
        await testConnectToDB();
        //checkStaticFolder();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server is not starting...");
        console.log(error);
    }
}

start();