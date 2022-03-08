module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Likes;
};
