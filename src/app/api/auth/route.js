'use server';

import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';
import { NextResponse } from "next/server";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';

export async function POST(request) {
    const body = await request.json();
    let token = body.token
    
    
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
    
    // response.setheader(
    //     'set-cookie',
    //     serialize('token', data.access_token, {
    //       path: '/',
    //       samesite: 'lax'
    //     }),
    // );
    
    return response
}