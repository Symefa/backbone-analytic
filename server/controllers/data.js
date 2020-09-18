const asyncHandler = require('../middlewares/asyncHandler');
const {
    DB_TABLES: {
        DB_Analytics,
        DB_Components,
        DB_yAxises,
        DB_Charts,
        DB_ChartTypes
    },
} = require('../utils/const');
const Sequelize = require('sequelize');
exports.show = asyncHandler(async (req, res, next) => {
    const {analytic_id, component_id} = req.query;
    const env = process.env.NODE_ENV || 'development';
    const config = require(__dirname + '/../config/config.js')[env];
    let target = new Sequelize(config.database_target, config.username, config.password, config);

    const analytic = DB_Analytics.findOne({
        where: {
            id: analytic_id,
            deleted_at: null
        },
        include: [
            {
                model: DB_Charts,
                attributes: ['name']
            },
            {
                model: DB_ChartTypes,
                attributes: ['name']
            },
            {
                model: DB_Components,
                where: {
                    id: component_id
                },
                include: [
                    {
                        model: DB_yAxises
                    }
                ]
            }
        ]
    });
    const result = await target.query(analytic.Components.queryStatement);
    const container = [];
    for (const yAxis of analytic.Components.yAxises) {
        let obj = {
            name: yAxis.name,
            data: result[yAxis.collumnName]
        };
        container.push(obj);
    }
    let obj = {
        categories: result[analytic.Components.xAxisName],
        series: container
    }

    return res.jsend.success(obj);
});

