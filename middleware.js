import { NextResponse } from "next/server";

export function middleware(req) {
  const origin = req.headers.get("origin");
  const allowedOrigins = ["https://www.ink3d.lol", "https://ink3d.lol"];
  const { pathname } = req.nextUrl;

  // PROTECT ADMIN PAGE — but not the login page itself
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("ink3d_admin")?.value;
    if (!token || token !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // PROTECT ADMIN API ROUTES
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    const token = req.cookies.get("ink3d_admin")?.value;
    if (!token || token !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // CORS + SECURITY HEADERS FOR ALL API ROUTES
  if (pathname.startsWith("/api/")) {
    const res = NextResponse.next();
    if (origin && allowedOrigins.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }
    res.headers.set("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
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
  matcher: ["/admin/:path*", "/api/:path*"],
};
