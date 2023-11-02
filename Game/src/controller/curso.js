const { where } = require('sequelize')
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

        catch (e) {
            console.log(e)
        }
    }
}

const read = async (req, res) => {
    const id = req.params.id
    const curso = await Curso.findOne({ where: { id }, include: models.Area })
    res.render('curso/read', {
        curso: curso.toJSON()
    })
}

const update = async (req, res) => {
    const id = req.params.id;

    if (req.method === 'GET') {
        try {
            const curso = await Curso.findOne({ where: { id }, include: models.Area });

            if (!curso) {
                // Trate o caso em que o curso não foi encontrado, por exemplo, redirecione ou mostre uma mensagem de erro.
                res.status(404).send('Curso não encontrado');
                return;
            }

            // Renderize a view de atualização com os detalhes do curso.
            res.render('curso/update', { curso: curso.toJSON() });
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar o curso para edição');
        }
    } else if (req.method === 'POST') {
        // Aqui você pode lidar com a atualização dos dados do curso com os dados enviados no formulário.
        const cursoAtualizado = req.body;

        try {
            await Curso.update(cursoAtualizado, { where: { id } });
            res.redirect(`/curso/read/${id}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao atualizar o curso');
        }
    }
};



//const update = async(req, res) => {}
const remove = async (req, res) => {
    const { id } = req.params
    try{
        await Curso.destroy({where: { id : id } })
        res.send("curso apagado com sucesso")
    }

    catch(error){
        res.status(500).send(error)
    }
}

module.exports = { index, create, read, update, remove }