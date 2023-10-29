const path = require('path')

const index = (req, res)=>{
    res.render("0main/index", 
    {msg: "Joguin",
    layout: false})
}

const about = (req, res)=>{
    res.render("main/about", { 
        layout: false})
}

export default {index, about}