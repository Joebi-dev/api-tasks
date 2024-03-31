"use strict";
const quick_db_1 = require("quick.db");
const db = new quick_db_1.QuickDB();
//objectMain
const routes = {
    type: 'put',
    endpoint: '/tasks/completed/:id/:boolean',
    //tasks/completed/ true | false/idOfTask
    run: async (req, res) => {
        const completed = req.params.boolean;
        console.log(completed);
        const taskId = req.params.id;
        let tasks = await db.get('tasks') ?? [];
        const validID = typeof taskId === 'string' && !Number.isNaN(Number(taskId)) && parseInt(taskId, 10) > 0;
        const validBoolean = (completed.toLowerCase().includes('true') || completed.toLowerCase().includes('false')) && typeof completed === 'string';
        if (validID && validBoolean) {
            const id = parseInt(taskId, 10);
            const index = tasks.findIndex(task => task.id === id);
            if (index && index > -1) {
                const completedTick = JSON.parse(completed.toLowerCase());
                tasks[index].completed = completedTick;
                res.status(200).json({
                    status: 200,
                    message: completedTick ? 'task completed' : 'Task not completed',
                    task: tasks[index]
                });
                await db.set('tasks', tasks);
            }
            else {
                res.status(400).json({
                    status: 400,
                    error: 'id not found'
                });
            }
        }
        else {
            res.status(400).json({
                status: 400,
                error: 'provide an id and a true or false value'
            });
        }
    }
};
module.exports = routes;
