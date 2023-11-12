import { NextApiRequest, NextApiResponse } from 'next'
import sequelize from '../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';

export default async function handler(_req, res) {
    try {

        // res.end('ahahahhaha')
        // let sql = `SELECT * FROM activities`
        let sql = `SELECT * FROM activities`

        await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT}).then(x=>{
            res.end(JSON.stringify(x))
        })

    } catch (error) {
        // Handle any errors that occur during the request
        res.end(`err : ${error}`)
    }
  
}