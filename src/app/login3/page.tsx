"use client"

import styles from './main.module.scss'
import { getSession } from 'next-auth/react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from "next-auth/react";

//@ts-ignore
// export async function getServerSideProps(
//     context: GetServerSidePropsContext
//   ){
//     const session = await getSession({ req: context.req });
  
//     if (session) {
//       return {
//         redirect: {
//           destination: '/profile',
//           permananet: false,
//         },
//       };
//     }
  
//     return {
//       props: { session },
//     };
// };

export default function Home() {
    
    const { data: session } = useSession();

    return (
        <div className={`${styles[`login-app`]}`}>
           <p>Salut</p> 
        </div>
    )
}