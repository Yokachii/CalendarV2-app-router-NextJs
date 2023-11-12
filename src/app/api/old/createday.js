import { NextApiRequest, NextApiResponse } from 'next'
import Day from '../../module/model/day'
import sequelize from '../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      
        const {date,time,todayNote,objective} = req.body

        await Day.create({
          date:date,
          time:time,
          todayNote:todayNote,
          objective:objective,
        })

        res.json(['réussi']);

    } else {
      res.status(405).end(); // Méthode non autorisée (Method Not Allowed) pour les requêtes autres que POST
    }
  } catch (error) {
    // Gérez les erreurs ici
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
}