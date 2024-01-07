const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../database/database')

// Utilisation du middleware CORS pour permettre les requêtes depuis tous les domaines
app.use(cors());

// Middleware pour parser le body des requêtes
exports.authenticator = (req, res, next) =>{
    // récupérer le token
    const token = req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded)=>{
            // si problème => erreur
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            // décoder => next()
            else{
                console.log(decoded);
                const result = await db.query('SELECT is_admin FROM client where email= ?',[decoded.email])
                if(result.length === 1 && result[0].is_admin === 1){
                    next()
                }
                else{
                    res.status(403).json({erreur: "access denied"})
                }
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}