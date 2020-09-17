'use strict';
module.exports = (sequelize, DataTypes) => {
    const ChartTypes = sequelize.define(
        'ChartTypes',
        {
            name: DataTypes.STRING,
        },
        {timestamps: true}
    );
    ChartTypes.associate = function (models) {
        ChartTypes.hasMany(models.Analytics, {foreignKey: 'ChartTypeId', as: 'Analytics'});
    };
    return ChartTypes;
};
