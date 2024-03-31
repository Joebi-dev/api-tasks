"use strict";
const tslib_1 = require("tslib");
const quick_db_1 = require("quick.db");
const yup = tslib_1.__importStar(require("yup"));
const db = new quick_db_1.QuickDB();
//shema
const taskShema = yup.object().shape({
    name: yup.string().required(),
    message: yup.string().required(),
    schedule: yup.string()
});
//objectMain
const routes = {
    type: 'put',
    endpoint: '/edittask',
    //edittask?taskId={ taskId }
    run: async (req, res) => {
        const taskId = req.query.taskId;
        //verifica se o id é valido
        if (!Number.isNaN(Number(taskId)) && typeof taskId === 'string' && parseInt(taskId, 10) > 0) {
            const id = parseInt(taskId, 10);
            let tasks = await db.get('tasks') ?? [];
            const index = tasks.findIndex(task => task.id === id);
            let myBody;
            //verificar se o index foi encontrado
            if (index !== -1) {
                //verificar se os campos foram devidamente preenchidos
                try {
                    myBody = await taskShema.validate(req.body);
                    res.status(200).json({
                        status: 200,
                        message: 'task edited successfully'
                    });
                    tasks[index].name = myBody.name;
                    tasks[index].message = myBody.message;
                    tasks[index].schedule = myBody.schedule ? myBody.schedule : "anything";
                    await db.set('tasks', tasks);
                }
                catch (e) {
                    const yupErr = e;
                    res.status(400).json({
                        status: 400,
                        error: yupErr.message
                    });
                }
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
                error: 'provide a valid id'
            });
        }
    }
};
module.exports = routes;
