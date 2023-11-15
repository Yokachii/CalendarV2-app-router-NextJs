"use server";

import styles from '../../page.module.css'
import { headers } from 'next/headers';

import type { User } from '@/utils/type';
import Main from '@/components/todayList/index'

export default async function Home() {

    const headersList = headers()
    const userAcc = headersList.get('user-account')
    let userAccountJson:User={
        id:'',
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        activities:{},
        dailytask:{},
        dashboardwidget:[],
        day:{},
        notification:[],
        objective:{},
        song:[],
        todaytask:{},
        widgettask:[],
    }

    if(userAcc){
        userAccountJson=JSON.parse(userAcc)
    }


  return (
    <main>

        <Main user={userAccountJson}></Main>
        
    </main>
  )
}