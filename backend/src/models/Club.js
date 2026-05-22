module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    description: {
      type: DataTypes.TEXT
    }
  });
  return Club;
};
