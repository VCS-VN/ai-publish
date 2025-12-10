import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow iframing from your external domain
  //response.headers.set(
 //   "Content-Security-Policy",
//    "frame-ancestors https://ai.momi.au"
//  );

  // Remove X-Frame-Options (Next.js sets SAMEORIGIN by default)
  response.headers.delete("X-Frame-Options");

  return response;
}
