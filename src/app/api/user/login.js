import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';
// import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';



export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      
        const {email,password} = req.body

        let sql = `SELECT * FROM users WHERE email = '${email}'`

        await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT}).then(x=>{
            let user = x[0]
            if(user.password===password) {
              // setCookie('account-token', user.id, { req, res, maxAge: 60 * 60 * 45 }) //45days cookies ;
              res.end(JSON.stringify({statue:'succes',user:user}))
            }else{
              res.end(JSON.stringify({statue:'fail',error:'wrong password'}))
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