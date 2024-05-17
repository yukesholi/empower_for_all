"use client";

import React from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function PostRouter({ children, link }) {
   // at first i created such that every post will have a link to its own page
   // so i decided to remove the link from newsfeed/:id, awareness/:id, fundraiser/:id, businessPromotion/:id
   // to post/:id

   // const pathname = usePathname();
   const pathname = "/post";

   return (
      <>
         {link ? (
            <Link href={`${pathname}/${link}`}>{children}</Link>
         ) : (
            <> {children}</>
         )}
      </>
   );
}
