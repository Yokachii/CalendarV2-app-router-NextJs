import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from '../../../../module/model/user';
// import db from '../../../utils/db';
import { isPasswordValid } from '../../../../utils/hash';
// import type {User} from '../../../module/type'

export default NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      //@ts-ignore
      async authorize(credentials: any) {
        // await db.connect();

        const user = await Users.findOne({ where: { email: credentials.email } });

        // Check if user exists
        if (!user) {
          return null;
        }

        // Validate password
        const isPasswordMatch = await isPasswordValid(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        return {
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
});
