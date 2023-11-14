import { sql } from '@vercel/postgres'
import { AddForm } from '@/components/add-form/index'
import { DeleteForm } from '@/components/delete-form/index'
import { headers } from 'next/headers'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default function Page({}) {
    const headersList = headers()
    const userAcc = headersList.get('user-account')
    let userAccountJson

    if(userAcc){
        userAccountJson=JSON.parse(userAcc)
    }

    return (
        <main>
            <p>{userAccountJson.firstname}</p>
        </main>
    )
}