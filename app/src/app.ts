import { serve, setup } from 'swagger-ui-express'
import swaggerDocument from "./swagger.json"
import { router } from './routes'
import Express from 'express'
//variaves
const porta = 8080
const app = Express()



app.use('/api-docs', serve, setup(swaggerDocument));
app.use(Express.json())
app.use(router)
app.listen(porta, () => {
    console.log('rodando na porta ', porta)
})