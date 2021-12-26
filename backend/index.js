const express = require("express");
const cors = require("cors");
const db = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });

// Middlewares
const { checkUser, requireAuth } = require("./middlewares/authMiddleware");

const postRouter = require("./routes/Posts");
const usersRouter = require("./routes/Users");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
  res.sendStatus(200).send(res.locals.user.id);
});

// Routes
app.use("/api/posts", postRouter);
app.use("/api/users", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
