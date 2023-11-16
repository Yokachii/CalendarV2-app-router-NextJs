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
    let sqlRequest = body.sqlRequest
    
    
    let response = NextResponse.json({
        status:'error',
        error:'server error, please retry later'
    },{ status: 500 })
    
    
    // let sql = `SELECT * FROM users WHERE id = '${token}'`
    
    try {
        await sequelize.query(sqlRequest, {type:sequelize.QueryTypes.SELECT}).then(x=>{
        
            response = NextResponse.json({
                status:'succes',
                user:x,
            },{ status: 200 })
                
            return response
                
        })
    } catch (error) {
        response = NextResponse.json({
            status:'error',
            error:`${error}`
        },{ status: 505 })
        return response
    }
    
    // response.setheader(
    //     'set-cookie',
    //     serialize('token', data.access_token, {
    //       path: '/',
    //       samesite: 'lax'
    //     }),
    // );
    
    return response
}