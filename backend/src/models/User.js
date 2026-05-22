module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
    year: { type: DataTypes.STRING },
    batch: { type: DataTypes.STRING },
    course: { type: DataTypes.STRING },
    otp: { type: DataTypes.STRING },
    otpExpires: { type: DataTypes.DATE }
  });
  return User;
};
