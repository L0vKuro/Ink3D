import { NextResponse } from "next/server";

export function middleware(req) {
  const origin = req.headers.get("origin");
  const allowedOrigins = ["https://www.ink3d.lol", "https://ink3d.lol"];

  if (req.nextUrl.pathname.startsWith("/api/")) {
    const res = NextResponse.next();

    if (origin && allowedOrigins.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-XSS-Protection", "1; mode=block");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
