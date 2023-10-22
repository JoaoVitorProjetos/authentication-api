require('dotenv').config()

import express from 'express'
import db from './db/db'

import routes from './routes'

const app = express()
app.use(express.urlencoded())
app.use(routes)

const port = process.env.PORT;

//Testando servidor
app.listen(port, () => {
    console.log(`rodando na porta ${port}`)
})

//Conectando db
db()