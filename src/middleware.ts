import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function for role-based redirection
const redirectToDashboard = (role: number, url: string) => {
  const paths: Record<number, string> = {
    1: "/teacher/dashboard",
    2: "/student/dashboard",
  };
  return NextResponse.redirect(new URL(paths[role] || "/signin", url));
};

// Middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch cookies
  const token_value = request.cookies.get("user_token")?.value || "";
  const userInfoData = request.cookies.get("user_info")?.value || "{}";

  // Parse user info safely
  let userInfo: { is_verified?: boolean; role?: number } = {};
  try {
    userInfo = JSON.parse(userInfoData);
  } catch {
    // If parsing fails, assume unauthenticated
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const publicUrls: string[] = [
    "/signin",
    "/signup/teacher",
    "/signup/student",
    "/forgot-password",
    "/reset-password",
  ];

  const isPublicUrl = publicUrls.includes(pathname);

  // Prevent unauthenticated users from accessing protected routes
  if (!token_value && !isPublicUrl) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect authenticated users from public URLs to their dashboard
  if (token_value && isPublicUrl && userInfo.is_verified) {
    return redirectToDashboard(userInfo.role || 0, request.url);
  }

  // // Redirect unverified users to verify-email page
  // if (pathname !== "/verify-email" && !userInfo.is_verified) {
  //   return NextResponse.redirect(new URL("/verify-email", request.url));
  // }

  // // Redirect verified users from verify-email page to their dashboard
  // if (pathname === "/verify-email" && userInfo.is_verified) {
  //   return redirectToDashboard(userInfo.role || 0, request.url);
  // }

  // Allow valid requests to proceed
  return NextResponse.next();
}

// Config to define routes middleware should run on
export const config = {
  matcher: [
    "/teacher/:path*",
    "/student/:path*",
    "/signin",
    "/signup/:path*",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ],
};
