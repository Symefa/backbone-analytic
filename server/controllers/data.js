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

    const analytic = await DB_Analytics.findOne({
        where: {
            id: analytic_id,
            deletedAt: null
        },
        include: [
            {
                model: DB_Charts,
                attributes: ['name'],
                as: 'Chart'
            },
            {
                model: DB_ChartTypes,
                attributes: ['name'],
                as: 'ChartType'
            },
            {
                model: DB_Components,
                where: {id: component_id},
                as: 'Components',
                include: [
                    {
                        model: DB_yAxises,
                        as: 'yAxises'
                    }
                ]
            },
        ]
    });
    const result = await target.query(new Buffer.from(analytic.Components[0].queryStatement, 'base64').toString());
    let container = [];
    for (const yAxis of analytic.Components[0].yAxises) {
        let coldata = [];
        for (let i = 0; i < result[0].length; i++) {
            coldata.push(result[0][i][yAxis.columnName]);
        }
        let obj = {
            name: yAxis.name,
            data: coldata,
        };
        container.push(obj);
    }
    let cat = [];
    for (let i = 0; i < result[0].length; i++) {
        cat.push(result[0][i][analytic.Components[0].xAxisName]);
    }
    let obj = {
        categories: cat,
        series: container
    }

    return res.jsend.success(obj);
})
;

