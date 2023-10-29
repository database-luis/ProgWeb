import express from "express"
import router from "./src/router/router"
import {engine} from "express-handlebars"
const path = require('path')

const app = express()
const PORT = 4455
const morgan = require('morgan')

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', `${__dirname}/src/views`); // Substitua 'views' pelo caminho correto.


app.listen(PORT, () =>{
    console.log("alocado na porta", PORT)
})

app.use(morgan("combined"))
app.use(router)
