import { Request, Response } from "express";

export interface baseRoutes {
    type: "get"| "post"| "delete"|"put"| "patch"
    endpoint: string
    run(req: Request, res: Response): void
}
//request
export interface task{
    id?: number
    name: string
    message: string
    schedule?: string
    completed?: boolean
    date?: string
}
