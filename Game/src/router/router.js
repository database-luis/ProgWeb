import express from 'express'
import mainController from '../controller/main'
import AreaController from '../controller/area'
import cursoController from '../controller/curso'

const router = express.Router()

//Controladores Main
router.get('/', mainController.index)
router.get('/about', mainController.about)
router.get('/ui', mainController.ui)
router.get('/game', mainController.game)

//Controladores Area
router.get('/area' , AreaController.index)

//Controladores Curso
router.get('/curso', cursoController.index)
router.get('/curso/create', cursoController.create)
router.post('/curso/create', cursoController.create)
router.get('/curso/read/:id', cursoController.read)
router.get('/curso/update/:id', cursoController.update)
router.post('/curso/update/:id', cursoController.update)
router.get('/curso/remove/:id', cursoController.remove)


export default router
