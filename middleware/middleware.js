const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken')
const db = require('../database/database')
const Utilisateur = require('../models/userModel');
require('dotenv').config()

app.use(cors());


exports.authenticator = (req, res, next) => {

    const token = req.params.token ? req.params.token : req.headers.authorization

    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

            if(err){
                res.status(401).json({erreur: "Accès refusé"})
            } 
            else {
                next()
            }
        })
    } else {
        res.status(401).json({erreur: "Accès refusé"})
    }
}

exports.checkAdmin = (req, res, next) =>{
    const token = req.params.token ? req.params.token : req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded)=>{
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            else{
                console.log(decoded);
                console.log(decoded.email)
                const result = await Utilisateur.findOne({ where: { email: decoded.email } });
                if (result != null && result.role.includes("ROLE_ADMIN")) {
                    next()
                } else {
                    res.status(403).json({erreur: "Accès interdit"})
                }
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}

exports.checkComptable = (req, res, next) =>{
    const token = req.params.token ? req.params.token : req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded)=>{
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            else{
                console.log(decoded);
                console.log(decoded.email)
                const result = await Utilisateur.findOne({ where: { email: decoded.email } });
                if (result != null && result.role.includes("ROLE_COMPTABLE")) {
                    next()
                } else {
                    res.status(403).json({erreur: "Accès interdit"})
                }
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}