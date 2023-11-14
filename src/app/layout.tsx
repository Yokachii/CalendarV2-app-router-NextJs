// 'use server';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import '../style/global.css'
import Nav from '@/components/navbar/index'
import UserInfo from '@/components/user/userinfo'
import { headers } from 'next/headers'

export default function RootLayout({children,}: {children: React.ReactNode}) {

  const headersList = headers()
  const userAcc = headersList.get('user-account')
  let userAccountJson

  if(userAcc){
    userAccountJson=JSON.parse(userAcc)
  }

  let user = (
    <UserInfo user={userAccountJson}></UserInfo>
  )
  return (
    <html lang="en">
      <body style={{backgroundColor:'gray'}}>
        <Nav user={user}></Nav>

        <div style={{height:'70px'}}></div>

        {children}
      </body>
    </html>
  )
}