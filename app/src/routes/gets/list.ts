import { baseRoutes, task } from "../../functions/interfaces";
import { Request, Response } from "express";
import { QuickDB } from 'quick.db'
const db = new QuickDB()

//objectMain
const routes : baseRoutes = {
    type: 'get',
    endpoint: '/list',
    run: async (req: Request, res: Response) => {
        let tasks: Array<task> = await db.get('tasks') ?? []
        res.status(200).json(
            {
                status: 200,
                tasks
            }
        )
    }
}

export = routes
