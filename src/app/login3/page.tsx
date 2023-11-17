"use client"

import { FormEvent } from 'react';
import styles from './main.module.scss'
// import { SignIn,SignOut } from 'next-auth'
import {signIn,signOut,useSession} from 'next-auth/react'
import Form from './form';
import Form2 from './form2'

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

function Auth(){
    const { data: session } = useSession();

    if(session){
        return (
            <div>
                A
            </div>
        )
    }else{
        return (
            <div>
                B
            </div>
        )
    }
}

export default function Home() {
    
    return (
        <div>
            <Form></Form>
            <Form2></Form2>
            {Auth()}
        </div>
    )
}