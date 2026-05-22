module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        name: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, defaultValue: '#EF4444' },
        members: { type: DataTypes.JSON, defaultValue: [] } // Storing members as JSON array for simplicity
    });
    return Team;
};
