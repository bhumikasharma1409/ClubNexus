const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Club = require('./Club')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);
db.Event = require('./Event')(sequelize, DataTypes);
db.Team = require('./Team')(sequelize, DataTypes);
db.Activity = require('./Activity')(sequelize, DataTypes);
db.Application = require('./Application')(sequelize, DataTypes);
db.DutyLeave = require('./DutyLeave')(sequelize, DataTypes);
db.Opening = require('./Opening')(sequelize, DataTypes);
db.Registration = require('./Registration')(sequelize, DataTypes);

// Define Associations

// Club Associations
db.Club.hasMany(db.User, { foreignKey: 'clubId' });
db.User.belongsTo(db.Club, { foreignKey: 'clubId' });

db.Club.hasMany(db.Event, { foreignKey: 'clubId' });
db.Event.belongsTo(db.Club, { foreignKey: 'clubId' });

db.Club.hasMany(db.Team, { foreignKey: 'clubId' });
db.Team.belongsTo(db.Club, { foreignKey: 'clubId' });

db.Club.hasMany(db.Activity, { foreignKey: 'clubId' });
db.Activity.belongsTo(db.Club, { foreignKey: 'clubId' });

db.Club.hasMany(db.Application, { foreignKey: 'clubId' });
db.Application.belongsTo(db.Club, { foreignKey: 'clubId' });

db.Club.hasMany(db.DutyLeave, { foreignKey: 'clubId' });
db.DutyLeave.belongsTo(db.Club, { foreignKey: 'clubId' });

db.Club.hasOne(db.Opening, { foreignKey: 'clubId' });
db.Opening.belongsTo(db.Club, { foreignKey: 'clubId' });

// User Associations
db.User.belongsToMany(db.Event, { through: 'UserEvents' });
db.Event.belongsToMany(db.User, { through: 'UserEvents' });

db.User.hasMany(db.DutyLeave, { foreignKey: 'userId' });
db.DutyLeave.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.Registration, { foreignKey: 'userId' });
db.Registration.belongsTo(db.User, { foreignKey: 'userId' });

// Event Associations
db.Event.hasMany(db.DutyLeave, { foreignKey: 'eventId' });
db.DutyLeave.belongsTo(db.Event, { foreignKey: 'eventId' });

db.Event.hasMany(db.Registration, { foreignKey: 'eventId' });
db.Registration.belongsTo(db.Event, { foreignKey: 'eventId' });

module.exports = db;
