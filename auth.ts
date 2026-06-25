import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { role: string } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.role =
          profile.email === process.env.ADMIN_EMAIL ? "admin" : "pending";
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = (token.role as string) ?? "pending";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
