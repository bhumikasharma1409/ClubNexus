module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define('Registration', {
        name: { type: DataTypes.STRING, allowNull: false },
        rollNo: { type: DataTypes.STRING, allowNull: false },
        department: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        groupName: { type: DataTypes.STRING }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['userId', 'eventId']
            }
        ]
    });
    return Registration;
};
