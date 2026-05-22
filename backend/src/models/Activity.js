module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        action: { type: DataTypes.STRING, allowNull: false },
        details: { type: DataTypes.TEXT, allowNull: false }
    });
    return Activity;
};
