"use strict";
const tslib_1 = require("tslib");
const quick_db_1 = require("quick.db");
const date_fns_1 = require("date-fns");
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
    type: 'post',
    endpoint: '/newtask',
    run: async (req, res) => {
        let myBody;
        let newTask;
        try {
            myBody = await taskShema.validate(req.body);
            res.status(200).json({
                status: 200,
                message: 'task added successfully'
            });
            newTask = {
                id: await makeIds(),
                name: myBody.name,
                message: myBody.message,
                schedule: myBody.schedule ? myBody.schedule : "anything",
                completed: false,
                date: (0, date_fns_1.format)(new Date(), 'dd/MM/yyyy, HH:mm')
            };
            await db.push('tasks', newTask);
        }
        catch (e) {
            const yupErr = e;
            res.status(400).json({
                status: 400,
                error: yupErr.message
            });
        }
    }
};
//function
async function makeIds() {
    const tasks = await db.get('tasks') ?? [];
    if (tasks.length > 0) {
        const index = tasks.length - 1;
        const id = tasks[index].id;
        if (id)
            return id + 1;
    }
    else {
        return 1;
    }
}
module.exports = routes;
