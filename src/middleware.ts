import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
// import * as crypto from 'node:crypto'
// const crypto = import('node:crypto');
// import sequelize from '@/module/sequelizecore'
import User from './module2/model/user';
import sequelize from './module2/sequelize';
import { sql } from '@sequelize/core';
import { QueryTypes } from 'sequelize';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // let cookie

  const cookieStore = cookies()
  let token = cookieStore.get('token')?.value
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  // response.cookies.set('token', '83834e41-d99e-4ae2-bbac-6f7e7e8e8d98')
  // cookie = response.cookies.get('token')?.value
  
  const res = await fetch("http://localhost:3000/api/auth2", {
    method: "POST",
    body: JSON.stringify({token}),
  });
  const status = res.status
  
  if(status>=200&&status<300){
    const json = await res.json();
    let user = json.user
    let userDay = JSON.parse(user.day)



    let date = new Date()
    let dates = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(`${month}`.length<2) month=`0${month}`
    let strDate=`${dates}-${month}-${year}`



    if(userDay&&userDay[strDate]){
      response.headers.set('user-account', JSON.stringify(user));
    }else{

      // console.log(user,userDay)

      let day = {}

      Object.assign(day,userDay)

      let dailyTask = JSON.parse(user.dailytask)
      
      let todayTime:any = {}

      for(let key in dailyTask){
        let tmpObj:any = {}

        for(let key2 in dailyTask[key]){
          tmpObj[key2] = '0'
        }

        todayTime[key] = tmpObj
        
      }

      let key = strDate
      let value = {
        time:todayTime,
        todayNote:{},
        objective:dailyTask,
      }

      day[key]=value
      
      // let obj = {}

      // obj[key]=value

      // day.push(obj)

      // console.log(day,JSON.stringify(day))

      // console.log(day)

      const res = await fetch("http://localhost:3000/api/sqlrequest", {
        method: "POST",
        body: JSON.stringify({sqlRequest:`UPDATE users SET day = '${JSON.stringify(day)}' WHERE id="${user.id}"`}),
      });

      let json = await res.json()
      
      return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url))

      // response.headers.set('user-account', JSON.stringify(json?.user));

      // User.find({ where: { id: user.id } }).on('success', function (project) {
        
      // })

      // User.find({ where: { id: user.id } })
      // .on('success', function (user:any) {
      //   // Check if record exists in db
      //   if (user) {
      //     user.update({
      //       day:day,
      //     })
      //     .success(function () {})
      //   }
      // })

      // let sqlStr = `UPDATE users SET day = ${day} WHERE id=${user.id}`
    
      // await sequelize.query(sqlStr, {type:QueryTypes.SELECT})
      // .then(x=>{
      //   response.headers.set('user-account', JSON.stringify(x));
      // })

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