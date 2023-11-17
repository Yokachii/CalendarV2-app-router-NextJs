// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import User from '@/module/model/user';
// import db from '@/utils/db';
// import { isPasswordValid } from '@/utils/hash';
// import { NextRequest } from 'next/server';
// import x from '@/module/model/user'

// export async function POST(request) {
// export default NextAuth({pages: {},providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'Credentials',
//       //@ts-ignore
//       async authorize(credentials: any) {
//         // await db.connect();

//         const user = await User.findOne({ email: credentials.email });

//         // Check if user exists
//         if (!user) {
//           return null;
//         }

//         // Validate password
//         const isPasswordMatch = await isPasswordValid(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordMatch) {
//           return null;
//         }

//         return {
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
// ],

//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 Days
//   },
// });
// export default function POST(request:NextRequest){

// }
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import sequelize from '@/module/sequelize'
import { QueryTypes } from 'sequelize';
import { isPasswordValid } from '@/utils/hash';
import { compare, hash } from 'bcrypt';

const handler = NextAuth({
  providers:[
    CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: {},
              email: {},
              password: {}
            },
            async authorize(credentials:any, req:any) {
              //
              
              let sql = `SELECT * FROM users WHERE email = '${credentials?.email}'`
              
              await sequelize.query(sql, {type:QueryTypes.SELECT}).then(async x=>{
                
                const user:any = x[0];
                
                const passwordIsCorrect = await compare(credentials?.password||'',user?.password)
                
                if(passwordIsCorrect){
                  console.log('Password correct')
                  return user
                }
                
                // console.log(user.password)
                // console.log(passwordIsCorrect)
                
              })
              
              console.log({credentials})
              return null;
            }
          })
        ],
        session:{
          strategy:'jwt',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          updateAge: 24 * 60 * 60, // 24 hours
        },
})

export {handler as GET, handler as POST}