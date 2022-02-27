import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

import { query as q } from "faunadb"
import { fauna } from "../../../service/fauna"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user

      try {
        await fauna.query(
          q.Create(q.Collection("users"), {
            data: {
              email,
            },
          })
        )
        return true
      } catch {
        return false
      }
    },
  },
})
