const Modele = require('../models/modele');

exports.getAllModeles = async(req, res)=> {
    try {
        const modeles = await Modele.findAll();
        res.json(modeles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getModeleById = async(req, res)=> {
    try {
        const modele = await Modele.findByPk(req.params.id);
        if (!modele) {
            res.status(404).json({ message: 'Modèle non trouvé' });
        } else {
            res.json(modele);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createModele = async(req, res)=> {
    const { nom, portes, moteur } = req.body;
    const INSERT_MODELE_QUERY = 'INSERT INTO modeles (nom, portes, moteur) VALUES (?, ?, ?)';
    
    db.query(INSERT_MODELE_QUERY, [nom, portes, moteur], (error, results) => {
        if (error) {
            res.status(500).json({ message: error.message });
        } else {
            const nouveauModele = {
                id: results.insertId,
                nom,
                portes,
                moteur
            };
            res.status(201).json(nouveauModele);
        }
    });
}
