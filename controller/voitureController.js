const Voiture = require('../models/VoitureModel');

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
            res.status(404).json({ message: 'Voiture non trouvé' });
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
            return res.status(404).json({ message: 'Voiture non trouvé' });
        }

        if (voiture.isAcheter) {
            return res.status(400).json({ message: 'La Voiture a déjà été acheté' });
        }

        voiture.isAcheter = true;
        voiture.prixTotal += prixVente; // Ajouter le prix de la vente au prix total

        await voiture.save();

        res.status(200).json({ message: 'Voiture acheté avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.historiqueAchatsParMois = async (req, res) => {
    try {
        const result = await Voiture.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('date_achat')), 'annee'],
                [Sequelize.fn('MONTH', Sequelize.col('date_achat')), 'mois'],
                [Sequelize.fn('SUM', Sequelize.col('prixTotal')), 'prixTotalParMois']
            ],
            where: {
                isAcheter: true
            },
            group: [Sequelize.fn('YEAR', Sequelize.col('date_achat')), Sequelize.fn('MONTH', Sequelize.col('date_achat'))]
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
