import { clerkMiddleware } from "@clerk/nextjs/server";

// Use default middleware; exclude public routes via matcher below
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and public routes like /webhook and /studio
    '/((?!_next|webhook|studio|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};