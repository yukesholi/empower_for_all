"use client";
import React from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { FaRegCircleUser } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfileBtn() {
   const { data: session } = useSession();
   return (
      <div>
         <div className="dropdown dropdown-end">
            <div
               tabIndex={0}
               role="button"
               className="btn btn-ghost btn-circle avatar"
            >
               <div className="w-10 rounded-full">
                  <div className="flex justify-center h-full items-center  ">
                     {session?.user?.image ? (
                        <Image
                           src={session?.user?.image}
                           alt="profile"
                           width={200}
                           height={200}
                        />
                     ) : (
                        <FaRegCircleUser className="text-2xl " />
                     )}
                  </div>
               </div>
            </div>
            <ul
               tabIndex={0}
               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
               {session?.role == "admin" && (
                  <li>
                     <Link href="/admin">admin</Link>
                  </li>
               )}
               <li>
                  <Link href="/profile" className="justify-between">
                     Profile
                  </Link>
               </li>
               <li>
                  <Link href="/settings">Settings</Link>
               </li>
               <li>
                  <a
                     onClick={() => {
                        signOut();
                     }}
                  >
                     Logout
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
}
