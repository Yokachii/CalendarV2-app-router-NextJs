'use server';

import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
// import { test } from '../../../../utils/action'

export async function GET(request:NextRequest) {
    // const body = await request.json();
    // let token = body.token
    
    // let data = await test()
    
    let response = NextResponse.json({
        status:'succes',
        user:'test',
        // data:data,
    },{ status: 200 })  
    
    return response
}