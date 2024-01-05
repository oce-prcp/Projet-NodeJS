const Voiture = require('../models/voitureModel');
const Option = require('../models/optionModel');
const Utilisateur = require('../models/userModel')

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
            console.log(voiture)
            let prixTotal = voiture.prix
            console.log(await voiture.getOptions());
            for (let option of await voiture.getOptions()){
                prixTotal += option.prix;
            }
            console.log(prixTotal + " " + voiture.prixTotal)
            if (prixTotal != voiture.prixTotal){
                voiture.prixTotal = prixTotal    
                voiture.save()
            }
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
