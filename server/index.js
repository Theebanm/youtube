import express from "express";
import mongoose from "mongoose";
import dontenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentsRoutes from "./routes/comments.js";
import fast2sms from "fast-two-sms";
import path from "path";

dontenv.config();
const app = express();
// otp verification

var options = {
  authorization:
    "P31lsC8Du0KJdRoGamZ9SXpyhYWgOArnH5ifU62Vv4eEjwFNb7zsrFDONt3fA7McGdZHpa6JKC5u1nmg",
  message: "This is message code otp 5678",
  numbers: ["7092798393"],
};

// send message

fast2sms
  .sendMessage(options)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running on the PORT ${PORT}`);
});

const DB_URL = process.env.CONNECTION_URL;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((error) => {
    console.log(error);
  });
