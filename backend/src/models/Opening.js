module.exports = (sequelize, DataTypes) => {
    const Opening = sequelize.define('Opening', {
        technicalRoles: { type: DataTypes.JSON, defaultValue: [] }, // Array of strings
        nonTechnicalRoles: { type: DataTypes.JSON, defaultValue: [] }, // Array of strings
        poster: { type: DataTypes.STRING },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Opening;
};
