import express from "express"
require('dotenv').config()

const app = express()
const PORT = 4444
const host = process.env.DB_HOST

app.get('/', (req, res) => {
    res.send("Hello World!!")
})

app.listen(PORT, () => {
    console.log('Escutando na porta', PORT)
    console.log('Hospedado em', host)
})