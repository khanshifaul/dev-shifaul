import { db } from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, openAPI, twoFactor, username } from "better-auth/plugins";
import { sendResetPasswordEmail, sendVerifyEmail } from "./mail";
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({
      user,
      url,
      token,
    }: {
      user: { email: string };
      url: string;
      token: string;
    }) => {
      console.log(
        `[Auth] Reset password email sent successfully to ${user.email}`
      );
      console.log(`[Auth] Reset password URL: ${url}`);
      console.log(`[Auth] Reset password Token: ${token}`);
      await sendResetPasswordEmail(user.email, url);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      console.log(
        `[Auth] Verification email sent successfully to ${user.email}`
      );
      console.log(`[Auth] Verification URL: ${url}`);
      await sendVerifyEmail(user.email, url);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => ({
        email: profile.email,
        name: profile.name,
      }),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => ({
        email: profile.email,
        name: profile.name,
      }),
    },
  },
  // rateLimit: {
  //   window: 10, // 10 seconds
  //   max: 100, // Max requests in the window
  // },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      allowDifferentEmails: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    freshAge: 60 * 5, // 5 minutes
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  plugins: [
    openAPI(),
    twoFactor(),
    username(),
    nextCookies(),
    admin({ defaultRole: "user", adminRole: "admin" }),
  ],
});
