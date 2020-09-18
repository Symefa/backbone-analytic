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

exports.index = asyncHandler(async (req, res, next) => {
    const analytics = await DB_Analytics.findAll({
        where: {
            deleted_at: null,
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
        ]
    });

    let results = [];
    for (const analytic of analytics) {
        let obj = {
            analytic: {
                id: analytic.id,
                isDrilldown: analytic.isDrilldown,
                chart: analytic.Chart.name,
                chartType: analytic.ChartType.name,
                themeData: analytic.themeData
            }
        };
        results.push(obj);
    }

    res.jsend.success(results);
});

exports.show = asyncHandler(async (req, res, next) => {
    const {id} = req.query;
    const analytic = await DB_Analytics.findOne({
        where: {
            id: id,
            deleted_at: null,
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
                include: [
                    {
                        model: DB_yAxises
                    }
                ]
            },
        ]
    });
    let obj = {
        analytic: {
            id: analytic.id,
            isDrilldown: analytic.isDrilldown,
            chart: analytic.Chart.name,
            chartType: analytic.ChartType.name,
            themeData: analytic.themeData,
            components: analytic.Components,
        }
    }
    res.jsend.success(obj);
});

exports.create = asyncHandler(async (req, res, next) => {
    const {
        is_drilldown,
        chart_id,
        chart_type_id,
        theme_data,
        components
    } = req.body;
    try {
        const analytic = await DB_Analytics.create({
            isDrilldown: is_drilldown,
            chartId: chart_id,
            chart_type_id: chart_type_id,
            themeData: theme_data
        });
        if (analytic) {
            for (const component of components) {
                const component = await DB_Components.create({
                    analyticId: analytic.id,
                    queryStatement: component.query_statement,
                    xAxisName: component.x_axis_name,
                })
                if (component) {
                    for (const yAxis of component.y_axises) {
                        DB_yAxises.create({
                            componentId: component.id,
                            name: yAxis.name,
                            stackName: yAxis.stack_name,
                        })
                    }
                }
            }
        }
    } catch (e) {
        return res.status(400).jsend.error({
            message: 'Database Error.'
        });
    }

});

exports.update = asyncHandler(async (req, res, next) => {
    const {
        id,
        is_drilldown,
        chart_id,
        chart_type_id,
        theme_data,
        components
    } = req.body;
    try {
        const analytic = await DB_Analytics.findOne({
            where: {
                id: id,
                deletedAt: null,
            }
        });
        if (analytic) {

            analytic.isDrilldown = is_drilldown;
            analytic.chartId = chart_id;
            analytic.chartTypeId = chart_type_id;
            analytic.themeData = theme_data;
            analytic.save();
            const components2 = await DB_Components.findAll({
                where: {
                    analyticId: analytic.id
                },
                attributes: ['id'],
            });
            for (const component of components2) {
                DB_yAxises.delete({
                    where: {
                        componentId: component.id,
                    }
                })
            }
            await DB_Components.delete({
                where: {
                    analyticId: analytic.id,
                }
            });

            for (const component of components) {
                const component = await DB_Components.create({
                    analyticId: analytic.id,
                    queryStatement: component.query_statement,
                    xAxisName: component.x_axis_name,
                })
                if (component) {
                    for (const yAxis of component.y_axises) {
                        DB_yAxises.create({
                            componentId: component.id,
                            name: yAxis.name,
                            stackName: yAxis.stack_name,
                        })
                    }
                }
            }
        } else {
            return res.status(400).jsend.error({
                message: 'Analytic not Found.'
            })
        }
    } catch (e) {
        return res.status(400).jsend.error({
            message: 'Database Error.'
        });
    }
});

exports.deleteA = asyncHandler(async (req, res, next) => {
    const {id} = req.body;
    const analytic = await DB_Analytics.findOne({
        where: {
            id: id,
            deleted_at: null,
        },
    });
    analytic.deletedAt = new Date();
    analytic.save();
    res.jsend.success('Analytic Deleted Successfully.')
});
