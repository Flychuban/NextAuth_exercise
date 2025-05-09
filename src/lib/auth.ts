import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import db from "./db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { userSchema } from "./zod_schema"
import { v4 as uuid } from "uuid"
import { encode } from "next-auth/jwt"

const prismaAdapter = PrismaAdapter(db)

export const { auth, handlers, signIn } = NextAuth({adapter: prismaAdapter, providers: [GitHub, Google, Credentials({
    credentials: {
        email: {},
        password: {}
    },
    authorize: async (credentials) => {
        const validateCredentials = userSchema.parse(credentials)

        const user = await db.user.findFirst({
            where: {
                email: validateCredentials.email as string,
                password: validateCredentials.password as string
            }
        })
        if (!user) {
            throw new Error("Invalid credentials")
        }
        return user
    },
  })],
  callbacks: {
    async jwt({token, account}) {
        if (account?.provider === "credentials") {
            token.credentials = true
        }
        return token
    },
  },
  jwt: {
    encode: async function (params) {
        if (params.token?.credentials){
            const sessionToken = uuid();

            if (!params.token.sub) {
                throw new Error("No user id found in token")
            }
            const createdSession = await prismaAdapter?.createSession?.({
                sessionToken: sessionToken,
                userId: params.token.sub,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            })
            if (!createdSession) {
                throw new Error("Failed to create session")
            }
            return sessionToken
        }
        return encode(params)
    }
  }
})