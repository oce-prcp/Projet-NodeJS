const Voiture = require('../models/modele');

exports.getAllVoitures = async(req, res)=> {
    try {
        const voitures = await Voiture.findAll();
        res.json(voitures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getVoitureById = async(req, res)=> {
    try {
        const voiture = await Voiture.findByPk(req.params.id);
        if (!voiture) {
            res.status(404).json({ message: 'Modèle non trouvé' });
        } else {
            res.json(voiture);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createVoiture = async (req, res) => {
    const { nom, portes, moteur } = req.body;

    try {
        const newVoiture = await Voiture.create({ nom, portes, moteur });
        res.status(201).json(newVoiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.acheterVoiture = async(req, res)=> {
    const { voitureId, prixVente } = req.body;

    try {
        const voiture = await Voiture.findByPk(voitureId);

        if (!voiture) {
            return res.status(404).json({ message: 'Modèle non trouvé' });
        }

        if (voiture.isAcheter) {
            return res.status(400).json({ message: 'Le modèle a déjà été acheté' });
        }

        voiture.isAcheter = true;
        voiture.prixTotal += prixVente; // Ajouter le prix de la vente au prix total

        await voiture.save();

        res.status(200).json({ message: 'Modèle acheté avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.historiqueAchatsParMois = async(req, res)=> {
    try {
        const query = `
            SELECT YEAR(date_achat) AS annee, MONTH(date_achat) AS mois, SUM(prixTotal) AS prixTotalParMois
            FROM modeles
            WHERE isAcheter = true
            GROUP BY YEAR(date_achat), MONTH(date_achat)
        `;

        db.query(query, (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
