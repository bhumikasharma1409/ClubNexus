module.exports = (sequelize, DataTypes) => {
    const DutyLeave = sequelize.define('DutyLeave', {
        studentName: { type: DataTypes.STRING, allowNull: false },
        rollNo: { type: DataTypes.STRING, allowNull: false },
        eventName: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' }
    });
    return DutyLeave;
};
