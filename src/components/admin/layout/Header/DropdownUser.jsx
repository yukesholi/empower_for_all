"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import userAvatar from "@/assets/images/user-avatar.png";

const DropdownUser = () => {
   const { data: session } = useSession();

   const [dropdownOpen, setDropdownOpen] = useState(false);

   const trigger = useRef(null);
   const dropdown = useRef(null);

   // close on click outside
   useEffect(() => {
      const clickHandler = ({ target }) => {
         if (!dropdown.current) return;
         if (
            !dropdownOpen ||
            dropdown.current.contains(target) ||
            trigger.current.contains(target)
         )
            return;
         setDropdownOpen(false);
      };
      document.addEventListener("click", clickHandler);
      return () => document.removeEventListener("click", clickHandler);
   });

   // close if the esc key is pressed
   useEffect(() => {
      const keyHandler = ({ keyCode }) => {
         if (!dropdownOpen || keyCode !== 27) return;
         setDropdownOpen(false);
      };
      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
   });

   return (
      <div className="relative">
         <Link
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-4"
            href="#"
         >
            <span className="hidden text-right lg:block">
               <span className="block text-sm font-medium text-black">
                  {session?.user?.name}
               </span>
               <span className="block text-xs">admin</span>
            </span>

            <span className="h-12 w-12 rounded-full">
               <Image
                  src={session?.user?.image || userAvatar}
                  className="rounded-full"
                  alt="profile image"
                  width={200}
                  height={200}
               />
              
            </span>
         </Link>
      </div>
   );
};

export default DropdownUser;
