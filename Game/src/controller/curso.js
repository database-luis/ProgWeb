const models = require('../models')
const curso = require('../models/curso')
const Curso = models.Curso

const index = async (req, res) => {
    const cursos = await Curso.findAll()
    res.render('curso/index', {
        cursos: cursos.map(curso => curso.toJSON())
    })
}
const create = async (req, res) => {

    if (req.route.methods.get) {
        res.render('curso/create')
    }
    else {
        const curso = req.body

        try {
            console.log("criou!")
            await Curso.create(curso)
            res.redirect('/curso')
        } 
        
        catch(e) {
            console.log(e)
        }
    }
}
const read = async (req, res) => {
    const id = req.params.id
    const curso = await Curso.findOne({where: { id }, include: models.Area})
    res.render('curso/read', {
       curso: curso.toJSON()
    })
}
const update = async (req, res) => {
}
const remove = async (req, res) => {
}

module.exports = { index, create, read, update, remove }