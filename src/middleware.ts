import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
// import User from '@/module/model/user'
import sequelize from '@/module/sequelize'
// import { Sequelize } from 'sequelize'
import { sql } from '@sequelize/core';
// import type { User } from './utils/type'
import { QueryTypes } from 'sequelize'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // let cookie

  const cookieStore = cookies()
  let token = cookieStore.get('token')?.value
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  // response.cookies.set('token', '83834e41-d99e-4ae2-bbac-6f7e7e8e8d98')
  // cookie = response.cookies.get('token')?.value
  
  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    body: JSON.stringify({token}),
  });
  const status = res.status
  
  if(status>=200&&status<300){
    const json = await res.json();



    let date = new Date()
    let dates = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(`${month}`.length<2) month=`0${month}`
    let strDate=`${dates}-${month}-${year}`



    if(json.day&&json.day[strDate]){
      response.headers.set('user-account', JSON.stringify(json.user));
    }else{

      let day = json.day

      let dailyTask = json.dailytask
      
      let todayTime:any = {}

      for(let key in dailyTask){
        let tmpObj:any = {}

        for(let key2 in dailyTask[key]){
          tmpObj[key2] = '0'
        }

        todayTime[key] = tmpObj
        
      }

      day[strDate] = {
        time:todayTime,
        todayNote:{},
        objective:dailyTask,
      }

      let sqlStr = `UPDATE users SET day = ${day} WHERE id=${json.id}`
    
      await sequelize.query(sqlStr, {type:QueryTypes.SELECT}).then(x=>{
        response.headers.set('user-account', JSON.stringify(x));
      })

    }

  }else{
    response.headers.set('user-account', '');
  }

  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}