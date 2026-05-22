module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        time: { type: DataTypes.STRING, allowNull: false },
        place: { type: DataTypes.STRING, allowNull: false },
        poster: { type: DataTypes.STRING },
        isDutyLeaveEnabled: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
    return Event;
};
