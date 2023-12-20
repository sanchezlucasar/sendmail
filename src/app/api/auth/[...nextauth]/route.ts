import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'
import db from '@/libs/db'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'email' },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req: any) {

                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Invalid credentials');
                }

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error('No user found')

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                if (!matchPassword) throw new Error('Wrong password')

                return {
                    id: String(userFound.id),
                    name: userFound.username,
                    email: userFound.email
                }


            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
