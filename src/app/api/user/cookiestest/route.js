// 'use server';

'use server';

import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
 
async function create() {
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set('name', 'value', { expires: Date.now() - oneDay })
}

export async function GET(request) {
    
    let response = NextResponse.json({
        status:'succes',
    },{ status: 200 })

    create()
    
    return response
}