'use server';

import Image from 'next/image'
import '../style/global.css'
import styles from './page.module.css'
import { NextPageContext } from 'next'
import { useEffect } from 'react'
import { cookies } from 'next/headers';

import { useCookies } from 'react-cookie';

import { headers } from 'next/headers'

export default async function Home({}) {
  
  const cookieStore = cookies()
  const tok = cookieStore.get('token')

  const headersList = headers()
  const userAcc = headersList.get('user-account')
  let userAccountJson

  if(userAcc){
    userAccountJson=JSON.parse(userAcc)
  }

  const getTestApi = async () => {

    
    
    const res = await fetch("http://localhost:3000/api/user/cookiestest", {
      method: "GET",
    });
    
    const status = res.status
    console.log(status)
    // const json = await res.json();
    // console.log(status)

  };

  getTestApi()

  return (
    <main className={styles.main} style={{height:"150vh"}}>
      <p>2</p>
      <p>{userAccountJson.email}</p>
      {/* <p>name : {data.user.firstname}</p>
      <p>mail : {data.user.email}</p>
      <p>request state : {data2}</p> */}
      {/* <p>{test}</p> */}
    </main>
  )
}