import { hashPassword } from '@/utils/hash';
import {NextResponse} from 'next/server'
import User from '@/module/model/user';
import { compare, hash } from 'bcrypt';

export async function POST(request:Request){
    try {
        const {email,password,username} = await request.json();

        console.log({email,password,username})

        const hashedPassword = await hash(password,10)
        
        await User.create({
            firstname:username,
            lastname:"test tqt",
            email:email,
            password:hashedPassword,
            activities:JSON.stringify({}),
            dailytask:JSON.stringify({}),
            dashboardwidget:JSON.stringify([]),
            day:JSON.stringify({}),
            notification:JSON.stringify([]),
            objective:JSON.stringify({}),
            song:JSON.stringify([]),
            todaytask:JSON.stringify({}),
            widgettask:JSON.stringify([]),
          }).then((x:any) => {
        
            return NextResponse.json({message:'B'})
        
          });
    } catch (e) {
        console.log({e})
    }

    return NextResponse.json({message:'A'})
}