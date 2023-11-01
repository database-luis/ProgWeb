const index = (req, res)=>{
    res.render("main/index", )
}

const about = (req, res)=>{
    res.render("main/about")
}

const ui = (req, res) => {
    res.render("main/ui")
}

const game = (req, res) =>{
    res.render("main/game")
}

const auth = (req, res) => {
    if(!('usuario' in req.cookies)){
        res.cookie('usuario', 3452)
        res.send('Usuario identificado')
    }

    else {
        console.log(req.cookies)
        res.send('Usuario ja tinha sido identificado')
    }
}

export default {index, about, ui, game, auth}