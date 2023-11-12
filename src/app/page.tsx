
import Image from 'next/image'
import '../style/global.css'
import styles from './page.module.css'
import { NextPageContext } from 'next'
import { useEffect } from 'react'
import { cookies } from 'next/headers'
// import { useState } from 'react';

// const loginAccount = async (token) => {
//   const response = await fetch('http://localhost:3000/api/user/auth', {
//       method: 'POST',
//       headers: {
//       'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({token}), // Send message in request body
//   });
  
//   let data = await response.json();
//   return data
// }

// Home.getInitialProps = async (ctx: NextPageContext) => {
//   const data = ctx.res.getHeader('user-token');
//   ctx.res.removeHeader('user-token');

//   return {data:await loginAccount(data)}
// }

export default function Home({}) {

  // const [data2,setData2] = useState('')

  const getTestApi = async () => {
    let token = 1
    
    const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({token})
    });

    
    // let json = await response.json();
    // let status = response.status.toString()
    console.log(response.status)
  };

  getTestApi()
  
  const cookieStore = cookies()
  const tok = cookieStore.get('token')
  const tok2 = cookieStore.get('user-token')

  console.log(tok,tok2)

  return (
    <main className={styles.main} style={{height:"150vh"}}>
      <p>2</p>
      {/* <p>name : {data.user.firstname}</p>
      <p>mail : {data.user.email}</p>
      <p>request state : {data2}</p> */}
      {/* <p>{test}</p> */}
    </main>
  )
}