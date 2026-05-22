module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        name: { type: DataTypes.STRING, allowNull: false },
        rollNo: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.STRING, allowNull: false },
        contactNumber: { type: DataTypes.STRING, allowNull: false },
        position: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'), defaultValue: 'Pending' }
    });
    return Application;
};
