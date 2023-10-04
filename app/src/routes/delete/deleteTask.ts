import { baseRoutes, task } from "../../functions/interfaces";
import { Request, Response } from "express";
import { QuickDB } from 'quick.db'
const db = new QuickDB()

//objectMain
const routes: baseRoutes = {
    type: 'delete',
    endpoint: '/delete/task',
    ///delete/task?taskId={ taskId }
    run: async (req: Request, res: Response) => {
        const taskId = req.query.taskId;
        //verifica se o id é valido
        if (!Number.isNaN(Number(taskId)) && typeof taskId === 'string' && parseInt(taskId, 10) > 0) {
            const id = parseInt(taskId, 10)
            let tasks: Array<task> = await db.get('tasks') ?? []
            const index = tasks.findIndex(task => task.id === id)
            if (index !== -1) { 
                res.status(200).json({
                    status: 200,
                    message: 'task deleted',
                    task :tasks[index]
                })
                tasks.splice(index, 1)
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
                    error: 'provide a valid id'
                }
            )
        }
    }
}

export = routes