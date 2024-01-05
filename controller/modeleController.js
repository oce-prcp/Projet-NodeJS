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


exports.acheterModele = async(req, res)=> {
    const { modeleId, prixVente } = req.body;

    try {
        const modele = await Modele.findByPk(modeleId);

        if (!modele) {
            return res.status(404).json({ message: 'Modèle non trouvé' });
        }

        if (modele.isAcheter) {
            return res.status(400).json({ message: 'Le modèle a déjà été acheté' });
        }

        modele.isAcheter = true;
        modele.prixTotal += prixVente; // Ajouter le prix de la vente au prix total

        await modele.save();

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
