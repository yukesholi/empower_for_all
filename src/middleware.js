import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
   //this middleware function will run only if authorized callback returns true.
   function middleware(req) {
      if (req?.nextauth.token) {
         // if the user is suspended it redirects to suspended page
         if (
            req?.nextauth.token.status === "suspended" &&
            req?.nextUrl.pathname !== "/suspended"
         ) {
            return NextResponse.redirect(new URL("/suspended", req.url));
         }
         // if the user is not suspended and tries to access suspended page, it redirects to newsfeed page
         else if (
            req.nextUrl.pathname === "/suspended" &&
            req?.nextauth.token.status !== "suspended"
         ) {
            return NextResponse.redirect(new URL("/newsfeed", req.url));
         }
         // if the signed in user tries to access the login page, it redirects to newsfeed page
         else if (req.nextUrl.pathname.includes("/auth")) {
            return NextResponse.redirect(new URL("/newsfeed", req.url));
         }
         // if the signed in user tries to access the home page, it redirects to newsfeed page
         else if (req.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/newsfeed", req.url));
         }
         // if the signed in user tries to access the admin page, it redirects to admin dashboard page
         else if (req.nextUrl.pathname === "/admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
         }
      }
   },
   {
      callbacks: {
         authorized: ({ token, req }) => {
            if (!token && req.url.includes("/auth")) return true;
            // users who are not authenticated will be redirected to the login page
            else if (!token) return false;
            // admin can visit any page
            else if (token.role == "admin") return true;
            // users can visit any page except the admin page
            else if (token.role == "user" && !req.url.includes("/admin"))
               return true;
            else return false;
         },
      },
   }
);
