import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      
        const {email} = req.body

        let sql = `SELECT * FROM users WHERE email = '${email}'`

        await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT}).then(x=>{
            if(x.length>0){
                res.status(200).json({isExsite:true})
            }else{
                res.status(200).json({isExsite:false})
            }
        })

    } else {
      res.status(405).end(); // Méthode non autorisée (Method Not Allowed) pour les requêtes autres que POST
    }
  } catch (error) {
    // Gérez les erreurs ici
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
}