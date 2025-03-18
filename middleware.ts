import type { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

const publicRoutes = [
  "/",
  "/about",
  "/portfolio",
  "/skill",
  "/blog",
  "/service",
  "/contact",
  "/resume",
];
const authRoutes = ["/sign-in"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const adminRoutes = ["/admin/(.*)"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathName);
  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\*/g, ".*")}$`);
    return regex.test(pathName);
  });

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // Determine target URL using logical expressions and ternary operators
  const target = !session
    ? // If no session, redirect unless route is public/auth/password
      !(isPublicRoute || isAuthRoute || isPasswordRoute)
      ? new URL("/sign-in", request.url)
      : null
    : // If session exists, redirect to home if on auth/password route or admin without permission
    isAuthRoute ||
      isPasswordRoute ||
      (isAdminRoute && session.user.role !== "admin")
    ? new URL("/", request.url)
    : null;

  return target ? NextResponse.redirect(target) : NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|public|blog|portfolio|.*\\.png$).*)",
  ],
};
