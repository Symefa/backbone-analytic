'use strict';
module.exports = (sequelize, DataTypes) => {
    const yAxises = sequelize.define(
        'yAxises',
        {
            componentId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            stackName: DataTypes.STRING,
        },
        {timestamps: true}
    );
    yAxises.associate = function (models) {
        yAxises.belongsTo(models.Components, {foreignKey: 'componentId', as: 'Component'});
    };
    return yAxises;
};
