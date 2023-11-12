import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../module/model/user'
import sequelize from '../../../module/sequelize'
import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  // Make that below if condition as your own backend api call to validate user
  if (body.token==1) {

    const response = NextResponse.json(
        {
            a:"b"
        },
        { status: 200 }
    )

    // response.cookies.set({
    //     name: 'user-token',
    //     value: 'B',
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 24 * 7,
    // })

    return response;

  }

  return NextResponse.json({ success: false });
}