
import { router } from './routes'
import Express from 'express'
//variaves
const porta = 8080
const app = Express()


app.get('/api-docs', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=aQwCwVViAik&t=248s')
});

app.use(Express.json())
app.use(router)
app.listen(porta, () => {
    console.log('rodando na porta ', porta)
})