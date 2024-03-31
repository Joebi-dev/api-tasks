"use strict";
const quick_db_1 = require("quick.db");
const db = new quick_db_1.QuickDB();
//objectMain
const routes = {
    type: 'get',
    endpoint: '/list',
    run: async (req, res) => {
        let tasks = await db.get('tasks') ?? [];
        res.status(200).json({
            status: 200,
            tasks
        });
    }
};
module.exports = routes;
