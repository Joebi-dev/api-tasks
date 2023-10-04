import { baseRoutes, task } from "../../functions/interfaces";
import { Request, Response } from "express";
import { QuickDB } from "quick.db";
import {format} from 'date-fns'
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
    type: 'post',
    endpoint: '/newtask',
    run: async (req: Request, res: Response) => {
        let myBody: task
        let newTask: task
        try {
            myBody = await taskShema.validate(req.body)
            res.status(200).json({
                status: 200,
                message: 'task added successfully'
            })
            newTask = {
                id: await makeIds(),
                name: myBody.name,
                message: myBody.message,
                schedule: myBody.schedule ? myBody.schedule : "anything",
                completed: false,
                date: format(new Date(), 'dd/MM/yyyy, HH:mm')
            }
            await db.push('tasks', newTask)
        } catch (e) {
            const yupErr = e as yup.ValidationError
            res.status(400).json({
                status: 400,
                error: yupErr.message
            })

        }
    }
}

//function
async function makeIds(): Promise<number | undefined> {
    const tasks: Array<task> = await db.get('tasks') ?? [];
    if (tasks.length > 0) {
        const index = tasks.length - 1
        const id = tasks[index].id
        if (id)return id+1
    } else {
        return 1
    }
}

export = routes
