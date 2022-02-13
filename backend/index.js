const express = require("express");
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });

// Middlewares
const { checkUser, requireAuth } = require("./middlewares/authMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());

// Jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(`${res.locals.user.id}`);
});

// Routes
const postRouter = require("./routes/Posts");
const usersRouter = require("./routes/Users");
const commentRouter = require("./routes/Comments");

app.use("/api/posts", postRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
