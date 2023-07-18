const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Diets', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
        
    });
};