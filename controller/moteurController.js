const Moteur = require('../models/moteurModel')

exports.create= async(req, res)=>{
    let moteur = req.body
    let result = await Moteur.create(moteur)
    result.save()
    res.status(201).json(result)
}

exports.update = async(req, res)=>{
    let idP = parseInt(req.params.id)
    let updateMoteur = req.body
    
    let moteur = await Moteur.update(updateMoteur,{
        where: {
            id: idP
        }
    })
    res.status(200).json(moteur)
}

exports.getAll= async(req, res)=>{
    const moteur = await Moteur.findAll()
    res.status(200).json(moteur)
}

exports.moteurId= async(req, res)=>{
    const moteur = await Moteur.findByPk(parseInt(req.params.id))
    res.status(200).json(moteur)
}

exports.delete = async (req, res) => {
    const moteurId = parseInt(req.params.id);

    try {
        const moteur = await Moteur.findByPk(moteurId);

        if (!moteur) {
            return res.status(404).json({ message: 'Moteur non trouvé' });
        }

        await moteur.destroy();

        res.status(200).json({ message: 'Moteur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
