const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { lastname, firstname, job, username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  try {
    if (!user) {
      await bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          lastname: lastname,
          firstname: firstname,
          job: job,
          username: username,
          password: hash,
        });
        res.status(201).json("Utilisateur créé !");
      });
    } else {
      console.log("Pseudo déjà pris !");
      res.json("Pseudo déjà pris !");
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ err });
  }
};

module.exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "Utilisateur inconnu" });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res
        .status(200)
        .json({ error: "Combinaison identifiant/mot de passe incorrecte" });
    } else {
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(200).json({ user: user.id });
    }
  });
};

module.exports.logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
