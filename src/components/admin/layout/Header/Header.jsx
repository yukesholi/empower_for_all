import React from "react";
import DropdownUser from "./DropdownUser";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";

const Header = (props) => {
   return (
      <header className="sticky top-0 z-50 flex w-full bg-white shadow">
         <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
               {/* <!-- Hamburger Toggle BTN --> */}
               <button
                  aria-controls="sidebar"
                  onClick={(e) => {
                     e.stopPropagation();
                     props.setSidebarOpen(!props.sidebarOpen);
                  }}
                  className="z-[100] block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden"
               >
                  <RiMenu2Fill className="h-5.5 w-5.5" />
               </button>
               {/* <!-- Hamburger Toggle BTN --> */}
            </div>

            <div className="ml-auto flex items-center gap-3 2xsm:gap-7">
               <DropdownUser />
            </div>
         </div>
      </header>
   );
};

export default Header;
