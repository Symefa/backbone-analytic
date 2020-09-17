'use strict';
module.exports = (sequelize, DataTypes) => {
    const Analytics = sequelize.define(
        'Analytics',
        {
            isDrilldown: DataTypes.BOOLEAN,
            chartId: DataTypes.INTEGER,
            chartTypeId: DataTypes.INTEGER,
            themeData: DataTypes.TEXT,
        },
        {timestamps: true}
    );
    Analytics.associate = function (models) {
        Analytics.belongsTo(models.Charts, {foreignKey: 'chartId', as: 'Chart'});
        Analytics.belongsTo(models.ChartTypes, {foreignKey: 'chartTypeId', as: 'ChartType'});
    };
    return Analytics;
};
