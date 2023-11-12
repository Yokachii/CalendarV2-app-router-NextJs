import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      
        const {token} = req.body

        let sql = `SELECT * FROM users WHERE id = '${token}'`

        await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT}).then(x=>{
            let user = x[0]
            if(user&&user.id){
              res.status(200).end(JSON.stringify({statue:'succes',user:user}))
            }else{
              res.status(404).end(JSON.stringify({statue:'fail',error:'no account find'}))
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