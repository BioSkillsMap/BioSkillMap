import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from 'next-auth/providers/github';
import { PrismaClient } from "@prisma/client";
import { IoPersonCircleSharp } from "react-icons/io5";
import { prisma } from "prisma/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],  
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({account, email, profile, user,credentials}) {
      return '/';
    }
  }
});
