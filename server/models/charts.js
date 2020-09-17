'use strict';
module.exports = (sequelize, DataTypes) => {
    const Charts = sequelize.define(
        'Charts',
        {
            name: DataTypes.STRING,
        },
        {timestamps: true}
    );
    Charts.associate = function (models) {
        Charts.hasMany(models.Analytics, {foreignKey: 'ChartId', as: 'Analytics'});
    };
    return Charts;
};
