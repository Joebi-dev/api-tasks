import { Response, Request, Router } from "express";
import { baseRoutes } from "./functions/interfaces";
import { readdirSync } from 'fs'
import { join } from "path";

//variavez
const router: Router = Router()
const categoriesPath = join(__dirname, 'routes')
const categories = readdirSync(categoriesPath)
//functions
async function registerRoutes() {
    try {
        for (const categorie of categories) {
            const routerPath = join(categoriesPath, categorie);
            const routesFiles = readdirSync(routerPath).filter(file => file.endsWith('.js'));
            for (const file of routesFiles) {
                const filePath = join(routerPath, file)

                let routes: baseRoutes = await import(filePath)
                router[routes.type](routes.endpoint, (req: Request, res: Response) => {
                    routes.run(req, res)
                })
                console.log(`http://localhost:8080${routes.endpoint}`)
            }
        }
        console.log('^^^^^endpoints^^^^^')
    } catch (e) {
        console.log('erro, routes 22')
    }
}
registerRoutes()

export { router }
