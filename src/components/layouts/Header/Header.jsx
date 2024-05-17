import React from "react";
import Link from "next/link";
import Image from "next/image";

import ProfileBtn from "./ProfileBtn";
import logo from "@/assets/images/logo.png";
import NotificationBtn from "./NotificationBtn";

import CreatePost from "@/components/shared/post/modal/CreatePostModal";

export default async function Header() {
   const tabs = [
      {
         name: "Newsfeed",
         link: "/newsfeed",
      },
      {
         name: "Awareness",
         link: "/awareness",
      },
      {
         name: "Fundraiser",
         link: "/fundraiser",
      },
      { name: "Business", link: "/businessPromotion" },
   ];

   return (
      <div className="navbar bg-base-100 lg:w-5/6 mx-auto sticky top-0 mb-5 z-10 ">
         <div className="navbar-start">
            <div className="dropdown">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {tabs.map((tab, index) => (
                     <li key={index} className="active">
                        <Link href={tab.link}>{tab.name}</Link>
                     </li>
                  ))}
               </ul>
            </div>
            <Link href={"/"}>
               <Image src={logo} alt="logo" height={100} width={250} />
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
               {tabs.map((tab, index) => (
                  <li
                     key={index}
                     className={`${"bg-stone-200"} rounded-2xl mx-2 `}
                  >
                     <Link href={tab.link} className="w-28 flex justify-center">
                        <span>{tab.name}</span>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
         <div className="navbar-end">
            {/* <button className="btn btn-outline btn-primary ">
               {" "}
               <span className="text-black">+ Create </span>
            </button> */}
            <CreatePost />
            {/* notifications */}

            <NotificationBtn />

            {/* profile view */}
            <ProfileBtn />
         </div>
      </div>
   );
}
