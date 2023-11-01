import {Area} from '../models/index';

async function index(req, res) {
    const areas = await Area.findAll()
    res.render("area/index", {
        areas: areas.map((area) => area.toJSON())
    })
}

export default {index}