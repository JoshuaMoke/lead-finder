// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY ?? "");

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.RESEND_FROM_EMAIL,
      async sendVerificationRequest({ identifier, url }) {
        // Send the magic link via Resend
        await resend.emails.send({
          from: String(process.env.RESEND_FROM_EMAIL),
          to: identifier,
          subject: "Your Night Heron login link",
          html: `
            <p>Click the link below to sign in:</p>
            <p><a href="${url}">Sign in</a></p>
            <p>This link expires in 10 minutes.</p>
          `,
        });
      },
    }),
  ],
  pages: {
    signIn: "/signin",          // ✅ our custom sign-in page
    verifyRequest: "/verify-request", // ✅ custom verify-request page
  },
};
