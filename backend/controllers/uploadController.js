const { Users } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    ) {
      res.status(200).send('Type de fichier incompatible');
      
    }
    if (req.file.size > 500000) {
        res.status(200).send('Fichier trop volumineux');
    }
  } catch (err) {
    return res.status(201).json({ error: "" });
  }

  const fileName = req.body.username + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`../frontend/public/uploads/profil/${fileName}`)
  );

  try {
    const uid = req.body.id;
    const user = await Users.findByPk(uid, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
        res.status(200).send("Utilisateur inconnu")
    }
    const result = await user.update(
      { picture: fileName },
      { where: { id: uid } }
    );
    handleResult(result);
  } catch (err) {
    return err;
  }
};
