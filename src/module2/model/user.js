const { Sequelize, DataTypes, UUID, UUIDV1, json } = require('sequelize');
import sequelize from '../sequelize'

const User = sequelize.define('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstname:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastname:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    email:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    password:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    activities:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    dailytask:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    dashboardwidget:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    day:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    notification:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    objective:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    song:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    todaytask:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    widgettask:{
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'users',
    name: 'users',
    modelNamel: 'users'
});

(async () => {
    await User.sync({});
    console.log('La table "user" a été charger');
})();

export default User;