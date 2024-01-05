const Moteur = require('../models/moteurModel')

exports.create= async(req, res)=>{
    let moteur = req.body
    let result = await Moteur.create(moteur)
    result.save()
    res.status(201).json(result)
}
