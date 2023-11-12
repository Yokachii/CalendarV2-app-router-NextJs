import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';
// import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      
        const {firstname,lastname,email,password} = req.body

        await User.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password,
            activities:JSON.stringify([]),
            dailytask:JSON.stringify([]),
            dashboardwidget:JSON.stringify([]),
            day:JSON.stringify([]),
            notification:JSON.stringify([]),
            objective:JSON.stringify([]),
            song:JSON.stringify([]),
            todaytask:JSON.stringify([]),
            widgettask:JSON.stringify([]),
        }).then(x=>{
            res.status(200).json({statue:'reussi',user:x});
            // setCookie('account-token', x.id, { req, res, maxAge: 60 * 60 * 45 }) //45days cookies ;
        })


    } else {
      res.status(405).end(); // Méthode non autorisée (Method Not Allowed) pour les requêtes autres que POST
    }
  } catch (error) {
    // Gérez les erreurs ici
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
}