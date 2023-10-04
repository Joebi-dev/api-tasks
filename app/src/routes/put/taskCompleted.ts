import { baseRoutes, task } from "../../functions/interfaces";
import { Request, Response } from "express";
import { QuickDB } from 'quick.db'
const db = new QuickDB()

//objectMain
const routes: baseRoutes = {
    type: 'put',
    endpoint: '/tasks/completed/:id/:boolean',
    //tasks/completed/ true | false/idOfTask
    run: async (req: Request, res: Response) => {
        const completed = req.params.boolean
        console.log(completed)
        const taskId = req.params.id
        let tasks: Array<task> = await db.get('tasks') ?? []
        const validID = typeof taskId === 'string' && !Number.isNaN(Number(taskId)) && parseInt(taskId, 10) > 0
        const validBoolean = (completed.toLowerCase().includes('true') || completed.toLowerCase().includes('false')) && typeof completed === 'string'
       
        if (validID && validBoolean) {
            const id = parseInt(taskId, 10)
            const index = tasks.findIndex(task => task.id === id)

            if (index) {
                const completedTick = JSON.parse(completed.toLowerCase())
                console.log(completedTick)
                tasks[index].completed = completedTick
                res.status(200).json({
                    status: 200,
                    message: completedTick ? 'task completed' : 'Task not completed',
                    task: tasks[index]
                })
                await db.set('tasks', tasks)
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
                    error: 'provide an id and a true or false value'
                }
            )
        }

    }
}

export = routes