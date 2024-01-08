const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Voiture = require('../models/VoitureModel');
const Option = require('../models/optionModel');
const Utilisateur = require('../models/userModel')
const Moteur = require('../models/moteurModel')

const jwt = require('jsonwebtoken')

require('dotenv').config()

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
    const { nom, portes, prix, moteurId } = req.body;

    try {
        const moteur = moteurId ? await Moteur.findByPk(moteurId) : null;
        if (moteurId && !moteur) {
            return res.status(404).json({ message: 'Moteur non trouvé' });
        }

        const voiture = await Voiture.create({ nom, portes, prix });

        if (moteur) {
            await voiture.setMoteur(moteur);
        }

        await voiture.save();

        res.status(201).json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.acheterVoiture = async(req, res)=> {
    const voitureId = req.params.id
    const token = req.params.token ? req.params.token : req.headers.authorization

    try {
        const voiture = await Voiture.findByPk(voitureId);

        if (!voiture) {
            return res.status(404).json({ message: 'Voiture non trouvé' });
        }

        if (voiture.isAcheter) {
            return res.status(400).json({ message: 'La Voiture a déjà été acheté' });
        }

        if(token && process.env.SECRET_KEY){
            console.log(token)
            jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
                const user = await Utilisateur.findOne({
                    where: {
                        email: decoded.email
                    }
                });
                voiture.setUtilisateur(user);
            })
        } else {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        let prixTotal = voiture.prix
        for (let option of await voiture.getOptions()){
            prixTotal += option.prix;
        }
        console.log(prixTotal + " " + voiture.prixTotal)
        if (prixTotal != voiture.prixTotal){
            voiture.prixTotal = prixTotal    
            voiture.save()
        }

        voiture.isAcheter = true;

        await voiture.save();

        res.status(200).json({ message: 'Voiture acheté avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.add = async (req, res) => {
    const option = await Option.findByPk(req.params.id);
    const voiture = await Voiture.findByPk(req.body.id)
    voiture.addOption(option)
    
    await voiture.save();
    res.status(200).json({ message: "Option ajoutée avec succès"})
}


exports.removeOption = async (req, res) => {
    const option = await Option.findByPk(req.params.id);
    const voiture = await Voiture.findByPk(req.body.id)
    voiture.removeOption(option);
    
    await voiture.save();
    res.status(200).json({ message: "Option supprimé avec succès"})
}

exports.historiqueAchatsParMois = async (req, res) => {
    try {
        const historique = await Voiture.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('updatedAt')), 'annee'],
                [Sequelize.fn('MONTH', Sequelize.col('updatedAt')), 'mois'],
                [Sequelize.fn('SUM', Sequelize.col('prixTotal')), 'prixTotalParMois']
            ],
            where: {
                isAcheter: true
            },
            group: ['annee', 'mois'],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('updatedAt')), 'ASC'],
                [Sequelize.fn('MONTH', Sequelize.col('updatedAt')), 'ASC']
            ]
        });

        res.status(200).json(historique);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.editVoiture = async (req, res) => {
    const voitureId = req.params.id;
    const { nom, portes, prix, moteurId } = req.body;

    try {
        const voiture = await Voiture.findByPk(voitureId);

        if (!voiture) {
            return res.status(404).json({ message: 'Voiture non trouvé' });
        }

        // if (moteurId) {
        //     const moteur = await Moteur.findByPk(moteurId);
        //     console.log(moteur);
        //     if (!moteur) {
        //         return res.status(404).json({ message: 'Moteur non trouvé' });
        //     }
        //     voiture.setMoteur(moteur);
        // }

        // voiture.setMoteur(moteur)
        voiture.nom = nom || voiture.nom;
        voiture.portes = portes || voiture.portes;
        voiture.prix = prix || voiture.prix;

        await voiture.save();

        res.status(200).json({ message: 'Voiture mise à jour avec succès', voiture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteVoiture = async (req, res) => {
    const voitureId = req.params.id;

    try {
        const voiture = await Voiture.findByPk(voitureId);

        if (!voiture) {
            return res.status(404).json({ message: 'Voiture non trouvé' });
        }

        await voiture.destroy();

        res.status(200).json({ message: 'Voiture supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
