"use client";
import React from "react";
import { signOut } from "next-auth/react";
export default async function page() {
   return (
      <div className="w-fit mx-auto mt-52 text-center">
         <h1 className="text-2xl font-semibold text-stone-600 text-center">
            you have been suspended
         </h1>
         <p className="text-stone-600 text-center">
            {" "}
            please contact admin for further information
         </p>
         <button className="btn text-red-600" onClick={signOut}>sign out</button>
      </div>
   );
}
