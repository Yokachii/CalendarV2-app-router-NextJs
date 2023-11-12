import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    let tokenJson = body.token
    let token = tokenJson.value
    

    let response = NextResponse.json({
        status:'error',
        error:'server error, please retry later'
    },{ status: 500 })

    // let sql = `SELECT * FROM users WHERE id = '${token}'`
    let sql = `SELECT * FROM users WHERE id = '${token}'`

    await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT}).then(x=>{
        
        let user = x[0]

        if(user&&user.id){

            response = NextResponse.json({
                status:'succes',
                user:user,
            },{ status: 200 })

            return response
        }else{

            response = NextResponse.json({
                status:'error',
                error:'account not found'
            },{ status: 400 })
            
            return response
        }
        
    })

    return response
}