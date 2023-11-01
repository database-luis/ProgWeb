import express from "express"
import router from "./src/router/router"
import {engine} from "express-handlebars"
import sass from "node-sass-middleware"
import cookieParser from "cookie-parser"

const app = express()
const PORT = 4455
const morgan = require('morgan')

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/src/views/helpers/functions.js`),
    layoutsDir: `${__dirname}/src/views/layouts`,
    defaultLayout: 'main'
}));

app.set("view engine", "handlebars");
app.set('views', `${__dirname}/src/views`);


app.listen(PORT, () =>{
    console.log("alocado na porta", PORT)
})

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(morgan("combined"))
app.use(router)
app.use("/img", express.static(`${__dirname}/public/img`))
app.use("/css", express.static(`${__dirname}/public/css`))
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use("/js", [
    express.static(`${__dirname}/public/js`),
    express.static(`${__dirname}/node_modules/bootstrap/dist/js/`),
    express.static(`${__dirname}/node_modules/@popperjs\core\dist\esm`)
])
app.use("/tRex", express.static(`${__dirname}/../tRex`))

app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: "expanded",
    prefix: "/css"
}))