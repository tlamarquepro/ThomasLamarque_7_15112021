const { Users } = require("../models");

module.exports.getAllUsers = async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).json(users);
};

module.exports.getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({
      error: "Utilisateur non trouvé !",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    res.status(401).json({
      error: "Utilisateur non trouvé !",
    });
  } else {
    const { lastname, firstname, job, username, password } = req.body;
    user.update({
      lastname: lastname,
      firstname: firstname,
      job: job,
      username: username,
      password: password,
    });
    res.status(200).json({ message: "Modification effectuée !" });
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    res.status(401).json({
      error: "Utilisateur non trouvé !",
    });
  } else {
    user.destroy();
    res.status(200).json({ message: "Supression effectuée !" });
  }
};
