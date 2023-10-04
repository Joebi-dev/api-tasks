import { Request, Response } from "express";
import { baseRoutes, task } from "../../functions/interfaces";
import { QuickDB } from 'quick.db'
import * as yup from 'yup'
const db = new QuickDB()

//shema
const taskShema = yup.object().shape({
    name: yup.string().required(),
    message: yup.string().required(),
    schedule: yup.string()
})

//objectMain
const routes: baseRoutes = {
    type: 'put',
    endpoint: '/edittask',
    //edittask?taskId={ taskId }
    run: async (req: Request, res: Response) => {
        const taskId = req.query.taskId;
        //verifica se o id é valido
        if (!Number.isNaN(Number(taskId)) && typeof taskId === 'string' && parseInt(taskId, 10) > 0) {
            const id = parseInt(taskId, 10)
            let tasks: Array<task> = await db.get('tasks') ?? []
            const index = tasks.findIndex(task => task.id === id)
            let myBody : task
            //verificar se o index foi encontrado
            if (index !== -1) {
            //verificar se os campos foram devidamente preenchidos
                try {
                    myBody = await taskShema.validate(req.body)
                    res.status(200).json({
                        status: 200,
                        message: 'task edited successfully'
                    })
                    tasks[index].name = myBody.name
                    tasks[index].message = myBody.message
                    tasks[index].schedule = myBody.schedule ? myBody.schedule : "anything"
                    await db.set('tasks', tasks)
                } catch (e) {
                    const yupErr = e as yup.ValidationError
                    res.status(400).json({
                        status: 400,
                        error: yupErr.message
                    })
                }
            } else {
                res.status(400).json(
                    {
                        status: 400,
                        error: 'id not found'
                    }
                )
            }
        } else {
            res.status(400).json(
                {
                    status: 400,
                    error: 'provide a valid id'
                }
            )
        }
    }
}

export = routes