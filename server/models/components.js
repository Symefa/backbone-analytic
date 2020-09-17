'use strict';
module.exports = (sequelize, DataTypes) => {
    const Components = sequelize.define(
        'Components',
        {
            analyticId: DataTypes.INTEGER,
            queryStatement: DataTypes.TEXT,
            xAxisName: DataTypes.STRING
        },
        {timestamps: true}
    );
    Components.associate = function (models) {
        Components.belongsTo(models.Analytics, {foreignKey: 'analyticId', as: 'Analytic'});
    };
    return Components;
};
